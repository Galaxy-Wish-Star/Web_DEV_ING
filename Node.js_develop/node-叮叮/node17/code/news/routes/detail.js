const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');
const common = require('../utils/common');
require('../utils/filters')
router.get('/news_detail/:news_id', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let result = await common.getUserLogin(req, res);
        //右侧点击排行
        //点击量的排序，分页，取前六条的数据 ,第一页的
        let result3 = await handleDB(res, 'info_news', 'sql', 'info_news数据库查询出错', 'select title,id from info_news order by clicks desc limit 6');
        // console.log(result3);
        //获取详情页的对应的数据
        // console.log(req.params);
        let {
            news_id
        } = req.params;
        let result4 = await handleDB(res, 'info_news', 'find', 'info_news数据库查询出错', `id=${news_id}`);
        //判断数据id有news_id这篇新闻,如果有就可以继续操作，如果没有立马return
        if (!result4[0]) {
            //404页面状态保持
            common.abort404(req, res);
            return
        }
        // console.log(result4);
        let news_clicks = result4[0].clicks + 1;
        await handleDB(res, 'info_news', 'update', 'info_news数据库更新出错', `id=${news_id}`, {
            clicks: news_clicks
        })
        //判断用户是否收藏了新闻？
        let isCollection = false;
        if (result[0]) {
            let collectResult = await handleDB(res, 'info_user_collection', 'find', '数据库查询出错', `user_id=${result[0].id} and news_id=${news_id}`)
            if (collectResult[0]) {
                isCollection = true
            }
        }
        //查询和这篇新闻相关的评论，按时间排序desc查询
        let commentResult = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `news_id=${news_id} order by create_time desc`)

        //给每一条评论添加评论者信息
        for (let i = 0; i < commentResult.length; i++) {
            let commenterResult = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${commentResult[i].user_id}`)
            commentResult[i].commenter = {
                nick_name: commenterResult[0].nick_name,
                avatar_url: commenterResult[0].avatar_url ? commenterResult[0].avatar_url : '/news/images/worm.jpg'
            }
            //如果commentResult[i]有parent_id这个属性，就添加parent
            if (commentResult[i].parent_id) {
                var parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${commentResult[i].parent_id}`);
                var parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${parentComment[0].user_id}`)

                commentResult[i].parent = {
                    user: {
                        nick_name: parentUserInfo[0].nick_name,
                    },
                    content: parentComment[0].content
                }
            }

        }

        //把登录用户点赞过的评论全部都要查出来，传给前端 [id1,id2,id3,....]
        var user_like_comment_ids=[];
        if(result[0]){
            //查询登录用户的点赞过的评论对象[{},{},...]
            let user_like_commentResult=await handleDB(res,'info_comment_like','find','数据库查询出错',`user_id=${result[0].id}`);
            //遍历user_like_commentResult，取它的id,插入到user_like_comment_ids数组中
            user_like_commentResult.forEach(item=>{
                user_like_comment_ids.push(item.comment_id)
            })
        }
        //查询新闻作者的一些信息，传给前端进行渲染
        let authorResult=await handleDB(res,'info_user','find','数据库查询出错',`id=${result4[0].user_id}`)
        //查询作者总篇数[{}]
        let authorNewsResult=await handleDB(res, 'info_news','sql','数据库查询出错',`select count(*) from info_news where user_id=${authorResult[0].id}`)
        //查询作者粉丝数[{}]
        let authorFansResult=await handleDB(res,'info_user_fans','sql','数据库查询出错',`select count(*) from info_user_fans where followed_id=${authorResult[0].id}`)
        
        //判断用户是否关注这个新闻的作者？
        let isFollow = false;
        if (result[0]) {
            let followResult = await handleDB(res, 'info_user_fans', 'find', '数据库查询出错', `follower_id=${result[0].id} and followed_id=${authorResult[0].id}`)
            if (followResult[0]) {
                isFollow = true
            }
        }
        
        
        let data = {
            user_info: result[0] ? {
                nick_name: result[0].nick_name,
                avatar_url: result[0].avatar_url ? result[0].avatar_url : '/news/images/worm.jpg'
            } : false,
            newsClicks: result3,
            newsData: result4[0],
            isCollection,
            commentResult,
            user_like_comment_ids,
            authorResult:authorResult[0],
            authorNewsResult:authorNewsResult[0]['count(*)'],
            authorFansResult:authorFansResult[0]['count(*)'],
            isFollow
        }


        res.render('news/detail', data);
    })()

})
router.post('/news_detail/news_collect', (req, res) => {
    (async function () {
        /*
        点击收藏功能：点击之后，要往数据库中的info_user_collection表添加一条记录
        点击取消收藏功能：点击之后，要往数据库中info_user_collection表删除一条记录
        传参：哪一个用户user_id收藏了哪一条新闻news_id(需要传递)
        action表示收藏操作还是取消收藏的操作

        业务流程：
        1、获取登录状态，如果没有登录，就return
        2、获取参数，判空
        3、查询数据库，判断新闻是否存在，不存在的话就return
        4、根据action的值实现收藏或者取消收藏的功能
        5、返回操作成功
        */
        // 1、获取登录状态，如果没有登录，就return
        let result = await common.getUserLogin(req, res);
        if (!result[0]) {
            res.send({
                errno: '4101',
                errmsg: '用户未登录'
            })
            return
        }
        // 2、获取参数，判空
        let {
            news_id,
            action
        } = req.body;
        if (!news_id || !action) {
            res.send({
                errmsg: '参数错误1'
            })
            return
        }
        // 3、查询数据库，判断新闻是否存在，不存在的话就return
        let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${news_id}`)
        if (!newsResult[0]) {
            res.send({
                errmsg: '参数错误2'
            })
            return
        }
        // 4、根据action的值实现收藏或者取消收藏的功能
        if (action === 'collect') {
            //执行收藏操作
            await handleDB(res, 'info_user_collection', 'insert', '数据库添加失败', {
                user_id: result[0].id,
                news_id: news_id
            })
        } else {
            //执行取消收藏的操作
            await handleDB(res, 'info_user_collection', 'delete', '数据库删除失败', `user_id=${result[0].id} and news_id=${news_id}`)
        }
        // 5、返回操作成功
        res.send({
            errno: '0',
            errmsg: '操作成功'
        })
    })()
})
//处理评论和回复评论
router.post('/news_detail/news_comment', (req, res) => {
    (async function () {
        /*
        参数分析：
        一种评论新闻：评论内容，新闻的id
        一种回复评论：回复的内容，回复的id,parent_id(回复那条评论的id)

        业务流程：
        1、获取用户登录的信息
        2、获取参数，判空
        3、查询数据库，看看新闻是否存在
        4、往数据库中的info_comment表插入数据，如果有parent_id,也需要插入parent_id这个属性
        5、返回成功的响应(传给前端data数据，进行拼接)
        */
        // 1、获取用户登录的信息
        let result = await common.getUserLogin(req, res);
        if (!result[0]) {
            res.send({
                errno: '4101',
                errmsg: '用户未登录'
            })
            return
        }
        // 2、获取参数，判空
        let {
            news_id,
            comment,
            parent_id = null
        } = req.body;
        if (!news_id || !comment) {
            res.send({
                errmsg: '参数错误1'
            })
            return
        }
        // 3、查询数据库，看看新闻是否存在
        let newsResult = await handleDB(res, 'info_news', 'find', '数据库查询出错', `id=${news_id}`)
        if (!newsResult[0]) {
            res.send({
                errmsg: '参数错误2'
            })
            return
        }
        // 4、往数据库中的info_comment表插入数据，如果有parent_id,也需要插入parent_id这个属性
        let commentObj = {
            user_id: result[0].id,
            news_id,
            content: comment
        }
        //回复评论
        if (parent_id) {
            commentObj.parent_id = parent_id
            //如果有父评论，查询父评论的内容(info_comment)，父评论者的昵称(info_user)
            var parentComment = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${parent_id}`);

            var parentUserInfo = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${parentComment[0].user_id}`)
        }
        let insertResult = await handleDB(res, 'info_comment', 'insert', '数据库添加失败', commentObj)
        // 5、返回成功的响应(传给前端data数据，进行拼接)
        let data = {
            user: {
                avatar_url: result[0].avatar_url ? result[0].avatar_url : '/news/images/worm.jpg',
                nick_name: result[0].nick_name
            },
            content: comment,
            create_time: new Date(),
            id: insertResult.insertId,
            news_id,
            parent: parent_id ? {
                user: {
                    nick_name: parentUserInfo[0].nick_name,
                },
                content: parentComment[0].content
            }:null
        }
        res.send({
            errno: '0',
            errmsg: '操作成功',
            data
        })
    })()
})
//处理点赞和取消点赞
router.post('/news_detail/comment_like', (req, res) => {
    (async function () {
        /*
        参数分析：哪一个用户(登录用户)点赞了哪一条评论(comment_id)
        点赞和取消点赞：都是在同一个接口处理，还有一个参数action

        业务流程：
        1、获取登陆用户的信息
        2、获取参数，判空
        3、查询数据库，看看评论是否存在，
        4、根据action的值是add还是remove，来确定执行点赞还是取消点赞
            执行点赞：把哪一个用户点赞哪一条评论的信息，作为一条记录添加数据库 info_comment_like表
            取消点赞：在info_comment_like表中删除对应的记录
            (info_comment表中让like_count +1 或者 -1)
        5、返回操作成功
        */
        // 1、获取登陆用户的信息
        let result = await common.getUserLogin(req, res);
        if (!result[0]) {
            res.send({
                errno: '4101',
                errmsg: '用户未登录'
            })
            return
        }
        // 2、获取参数，判空
        let {
            comment_id,
            action,
        } = req.body;
        if (!comment_id || !action) {
            res.send({
                errmsg: '参数错误1'
            })
            return
        }
        // 3、查询数据库，看看评论是否存在
        let commentResult = await handleDB(res, 'info_comment', 'find', '数据库查询出错', `id=${comment_id}`);
        if (!commentResult[0]) {
            res.send({
                errmsg: '参数错误2'
            })
            return
        }
        // 4、根据action的值是add还是remove，来确定执行点赞还是取消点赞
        //     (info_comment表中让like_count +1 或者 -1)
        if (action === 'add') {
            //     执行点赞：把哪一个用户点赞哪一条评论的信息，作为一条记录添加数据库 info_comment_like表
            await handleDB(res,'info_comment_like','insert','数据库添加失败',{
                user_id:result[0].id,
                comment_id
            })
            //+1
            var like_count=commentResult[0].like_count ?commentResult[0].like_count+1:1
        } else {
            //     取消点赞：在info_comment_like表中删除对应的记录
            await handleDB(res,'info_comment_like','delete','数据库添加失败',`user_id=${result[0].id} and comment_id=${comment_id}`)
            //-1
            var like_count=commentResult[0].like_count ?commentResult[0].like_count-1:0
        }
        await handleDB(res,'info_comment','update','数据库修改失败',`id=${comment_id}`,{like_count})
        // 5、返回操作成功
        res.send({errno:'0',errmsg:'操作成功'})
    })()
})
//处理关注和取消关注
router.post('/news_detail/followed_user', (req, res) => {
    (async function () {
        /*
        点击关注功能：点击之后，要往数据库中的info_user_fans表添加一条记录
        点击取消关注功能：点击之后，要往数据库中info_user_fans表删除一条记录
        传参：哪一个用户关注了哪一条作者(需要传递)
        action表示关注操作还是取消关注的操作

        业务流程：
        1、获取登录状态，如果没有登录，就return
        2、获取参数，判空
        3、查询数据库，判断这个作者是否存在，不存在的话就return
        4、根据action的值实现关注或者取消关注的功能
        5、返回操作成功
        */
        // 1、获取登录状态，如果没有登录，就return
        let result = await common.getUserLogin(req, res);
        if (!result[0]) {
            res.send({
                errno: '4101',
                errmsg: '用户未登录'
            })
            return
        }
        // 2、获取参数，判空
        let {
            user_id,
            action
        } = req.body;
        if (!user_id || !action) {
            res.send({
                errmsg: '参数错误1'
            })
            return
        }
        // 3、查询数据库，判断这个作者是否存在，不存在的话就return
        let newsResult = await handleDB(res, 'info_user', 'find', '数据库查询出错', `id=${user_id}`)
        if (!newsResult[0]) {
            res.send({
                errmsg: '参数错误2'
            })
            return
        }
        // 4、根据action的值实现关注或者取消关注的功能
        if (action === 'follow') {
            //执行关注操作
            await handleDB(res, 'info_user_fans', 'insert', '数据库添加失败', {
                follower_id: result[0].id,
                followed_id: user_id
            })
        } else {
            //执行取消关注的操作
            await handleDB(res, 'info_user_fans', 'delete', '数据库删除失败', `follower_id=${result[0].id} and followed_id=${user_id}`)
        }
        // 5、返回操作成功
        res.send({
            errno: '0',
            errmsg: '操作成功'
        })
    })()
})
module.exports = router;