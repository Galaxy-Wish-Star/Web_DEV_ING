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
        let result = await handleDB(res,'info_category','find','info_category数据库查询出错');
        res.send(result);
    })()
})

router.get('/', (req, res) => {
    res.render('news/index');
})
module.exports = router;