const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');
const common = require('../utils/common');
const upload_file = require('../utils/qn');
const constant = require('../utils/constant');
const md5 = require('md5');
const keys = require('../keys');
const multer = require('multer');
//dest是设置图片上传的一个路径，从项目的根目录去找
const upload = multer({
    dest: 'public/news/upload/avatar'
})
//个人中心页面展示
router.get('/profile', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let result = await common.getUserInfo(req, res);
        let data = {
            user_info: result[0] ? {
                nick_name: result[0].nick_name,
                avatar_url: result[0].avatar_url ? constant.QINIU_AVATAR_URL+result[0].avatar_url : '/news/images/worm.jpg'
            } : false,
        }
        res.render('news/user', data)
    })()

})
//基本资料
router.all('/user/base_info', (req, res) => {
    (async function () {

        //拿到session中的user_id,判断用户是否登录
        let result = await common.getUserInfo(req, res)
        if (req.method == 'GET') {
            let data = {
                nick_name: result[0].nick_name,
                signature: result[0].signature,
                gender: result[0].gender ? result[0].gender : 'WOMAN'
            }
            res.render('news/user_base_info', data)
        } else if (req.method == 'POST') {
            /*
            1、获取参数，判空
            2、修改数据库的用户数据
            3、返回操作成功
            */
            //  1、获取参数，判空
            let {
                nick_name,
                signature,
                gender
            } = req.body
            if (!signature || !nick_name || !gender) {
                res.send({
                    errmsg: '参数错误'
                })
                return
            }
            //  2、修改数据库的用户数据
            await handleDB(res, 'info_user', 'update', '数据库修改失败', `id=${result[0].id}`, {
                signature,
                nick_name,
                gender
            })
            //  3、返回操作成功
            res.send({
                errno: '0',
                errmsg: '操作成功'
            })
        }
    })()
})
//密码修改
router.all('/user/pass_info', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let result = await common.getUserInfo(req, res);
        if (req.method == 'GET') {
            res.render('news/user_pass_info')
        } else if (req.method == 'POST') {
            /*
            1、获取参数，判空
            2、校验两次新密码是否一致
            3、校验旧密码是否正确
            4、修改数据库中info_user的表的password_hash
            5、返回操作成功
            */
            //  1、获取参数，判空
            let {
                old_password,
                new_password,
                new_password2
            } = req.body
            if (!old_password || !new_password || !new_password2) {
                res.send({
                    errmsg: '参数错误'
                })
                return
            }
            //  2、校验两次新密码是否一致
            if (new_password != new_password2) {
                res.send({
                    errmsg: '两次密码不一致'
                })
            }
            //  3、校验旧密码是否正确
            if (md5(md5(old_password) + keys.password_salt) !== result[0].password_hash) {
                res.send({
                    errmsg: '旧密码输入不正确，修改失败'
                })
                return
            }
            //  4、修改数据库中info_user的表的password_hash
            await handleDB(res, 'info_user', 'update', '数据库修改出错', `id=${result[0].id}`, {
                password_hash: md5(md5(new_password) + keys.password_salt)
            })
            //  5、返回操作成功
            res.send({
                errno: '0',
                errmsg: '操作成功'
            })
        }
    })()
})
//头像设置页面的展示
router.get('/user/pic_info', (req, res) => {
    (async function () {
        let result = await common.getUserInfo(req, res);
        let data={
            avatar_url:result[0].avatar_url ? constant.QINIU_AVATAR_URL+result[0].avatar_url : '/news/images/worm.jpg'
        }
        res.render('news/user_pic_info',data)
    })()
})
router.post('/user/pic_info', upload.single('avatar'), (req, res) => {
    (async function () {
        let result = await common.getUserInfo(req, res);
        // req.file//获取提交的图片信息对象
        /*
        {
            fieldname: 'avatar',
            originalname: 'dog.jpg',//原图片的名称
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'public/news/upload/avatar',
            filename: '3ef6b01c223212f7790f74a358bd7ae9',//图片当前的名称
            path: 'public\\news\\upload\\avatar\\3ef6b01c223212f7790f74a358bd7ae9',
            size: 78800
            }
        */
        // console.log(req.file);
        // upload_file(上传后的名字，上传的图片路径)   //上传的图片相对路径, 从项目文件夹出发
        /*
        1、接收上传图片的信息(对象)
        2、上传图片到七牛云的服务器
        3、把七牛云返回的key属性保存到数据库中
        4、返回上传成功
        */
        // 1、接收上传图片的信息(对象)
        let file = req.file
        // 2、上传图片到七牛云的服务器
        let ret = await upload_file(file.originalname, `${file.destination}/${file.filename}`)
        // { hash: 'FoKZ9aaWCkkeHF-4LVW0X89G045o', key: 'image/avatar/dog.jpg' }
        // 3、把七牛云返回的key属性保存到数据库中
        await handleDB(res,'info_user','update','数据库更改出错',`id=${result[0].id}`,{avatar_url:ret.key})
        // 4、返回上传成功
        //前缀：http://r5hvnqbx2.hn-bkt.clouddn.com/ ->看作是一个常量
        let data={
            avatar_url:constant.QINIU_AVATAR_URL+ret.key
        }
        // console.log(ret);
        res.send({errno:'0',errmsg:'上传成功',data})

    })()


})
//收藏页面的展示
router.get('/user/collection', (req, res) => {
    (async function () {
        let result = await common.getUserInfo(req, res);
        // console.log(req.query)
        let {page=1}=req.query;
        let currentPage=page;
        //总页数=总条数/每页多少条,向上取整
        //总条数 info_user_collection
        let counts=await handleDB(res,'info_user_collection','sql','数据库查询出错',
        `select count(*) from info_user_collection where user_id=${result[0].id}`)
        // console.log(counts)
        let totalPage=Math.ceil(counts[0]['count(*)']/5);
        // console.log(totalPage)
        //收藏新闻列表   limit (第几页的数据 -1)* 每页多少条, 每页多少条
        let collectionNewsIdList=await handleDB(res,'info_user_collection','find','数据库查询出错2',
        `user_id=${result[0].id} limit ${(currentPage-1)*5},5`)

        //遍历整个collectionNewsIdList数组，拿着里面的每一个元素的news_id属性去查询info_news表
        //把查询的结果，添加到collectionNewsList数组中
        let collectionNewsList=[]
        for(let i=0;i<collectionNewsIdList.length;i++){
            let ret=await handleDB(res,'info_news','sql','数据库查询出错3',
            `select title,create_time from info_news where id=${collectionNewsIdList[i].news_id}`)
            collectionNewsList.push(ret[0])
        }
        console.log(collectionNewsIdList);
        let data={
            currentPage,//当前第几页
            totalPage,//总页数
            collectionNewsList//收藏新闻信息的列表
        }
        res.render('news/user_collection',data)
    })()
})
module.exports = router;