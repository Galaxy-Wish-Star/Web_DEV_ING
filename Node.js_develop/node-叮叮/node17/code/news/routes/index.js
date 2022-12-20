const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');
const common =require('../utils/common');
require('../utils/filters');
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
//首页分类数据展示
//id,当前页数，每页条数
router.get('/news_list', (req, res) => {
    (async function () {
        //获取参数，cid(新闻分类id),page(当前页数)，per_page(每页条数)
        // console.log(req.query);
        let {
            page,
            cid,
            per_page
        } = req.query;
        //查询数据库新闻表中新闻，根据以上给三个参数，获取前端需要的数据
        //where 1 展示全部的数据
        let wh=cid !=1 ? `category_id=${cid} order by create_time desc ` : `1 order by create_time desc`
        let result = await handleDB(res, 'info_news', 'limit', 'info_news数据库查询出错',{
            where: wh,
            number: page,
            count: per_page
        })
        //触底加载，获取总页码
        //总页码=总条数/每一页的条数,取整，向上Math.ceil
        let result2=await handleDB(res,'info_news','sql','info_new数据库查询出错','select count(*) from info_news where '+wh);
        // console.log(result2);
        let total=Math.ceil(result2[0]['count(*)']/per_page)
        // console.log(total);
        //result[{...},{....}]
        //把查询到的数据返回前端
        res.send({
            newsList:result,
            totalPage:total,
            currentPage:parseInt(page)
        })
    })()

})
router.get('/', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let result=await common.getUserLogin(req,res);
        //首页头部分类
        let result2 = await handleDB(res, 'info_category', 'find', 'info_category数据库查询出错', ['name']);
        //右侧点击排行
        //点击量的排序，分页，取前六条的数据 ,第一页的
        let result3 = await handleDB(res, 'info_news', 'sql', 'info_news数据库查询出错', 'select title,id from info_news order by clicks desc limit 6');
        // console.log(result3);
        let data = {
            user_info: result[0] ? {
                nick_name: result[0].nick_name,
                avatar_url: result[0].avatar_url
            } : false,
            category: result2,
            newsClicks: result3
        }
        res.render('news/index', data);
    })()

})
module.exports = router;