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
        // let isCollection=false;
        // if(result[0]){
        //     let collectResult=await handleDB(res,'info_user_collection','find','数据库查询出错',`user_id=${result[0].id} and news_id=${news_id}`)
        //     if(collectResult[0]){
        //         isCollection=true
        //     }
        // }
        let data = {
            user_info: result[0] ? {
                nick_name: result[0].nick_name,
                avatar_url: result[0].avatar_url
            } : false,
            newsClicks: result3,
            newsData: result4[0],
            // isCollection
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
        res.send({errno:'0',errmsg:'操作成功'})
    })()
})

module.exports = router;