const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');
const common=require('../utils/common');
require('../utils/filters')
router.get('/news_detail/:news_id', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let result=await common.getUserLogin(req,res);
        //右侧点击排行
        //点击量的排序，分页，取前六条的数据 ,第一页的
        let result3 = await handleDB(res, 'info_news', 'sql', 'info_news数据库查询出错', 'select title,id from info_news order by clicks desc limit 6');
        // console.log(result3);
        //获取详情页的对应的数据
        // console.log(req.params);
        let {news_id}=req.params;
        let result4=await handleDB(res,'info_news','find','info_news数据库查询出错',`id=${news_id}`)
        // console.log(result4);
        let news_clicks=result4[0].clicks+1;
        await handleDB(res,'info_news','update','info_news数据库更新出错',`id=${news_id}`,{clicks:news_clicks})
        let data = {
            user_info: result[0] ? {
                nick_name: result[0].nick_name,
                avatar_url: result[0].avatar_url
            } : false,
            newsClicks: result3,
            newsData:result4[0]
        }


        res.render('news/detail',data);
    })()

})

module.exports = router;