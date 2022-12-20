const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');

//测试cookie和session
router.get('/set_cookie', (req, res) => {
    res.cookie('name', 'nodejs');
    req.session['age'] = 20;
    res.send('设置了cookie和session');
})

router.get('/get_cookie', (req, res) => {
    let name = req.cookies['name'];
    let age = req.session['age'];
    res.send(`获取的cookie值为${name},session的值为${age}`);
})

//测试数据库
router.get('/get_data', (req, res) => {
    (async function () {
        let result = await handleDB(res, 'info_category', 'find', 'info_category数据库查询出错');
        res.send(result);
    })()
})

router.get('/', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let user_id = req.session['user_id'];
        //查询数据库，再拿到数据库中id的用户信息
        let result=[];
        if (user_id) {
            result =await handleDB(res,'info_user','find','info_user数据库查询出错',`id=${user_id}`)
        }

        //首页头部分类
        let result2=await handleDB(res,'info_category','find','info_category数据库查询出错',['name']);
        let data={
            user_info:result[0] ? {
                nick_name:result[0].nick_name,
                avatar_url:result[0].avatar_url
            }:false,
            category:result2
        }
        res.render('news/index',data);
    })()

})
module.exports = router;