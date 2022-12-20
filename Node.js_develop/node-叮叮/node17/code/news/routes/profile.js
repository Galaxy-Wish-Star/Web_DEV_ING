const express = require('express');
const router = express.Router();
const handleDB = require('../db/handleDB');
const common = require('../utils/common');
const md5=require('md5');
const keys=require('../keys');
//个人中心页面展示
router.get('/profile', (req, res) => {
    (async function () {
        //拿到session中的user_id,判断用户是否登录
        let result = await common.getUserLogin(req, res);
        if (!result[0]) {
            res.redirect('/')
        }
        let data = {
            user_info: result[0] ? {
                nick_name: result[0].nick_name,
                avatar_url: result[0].avatar_url ? result[0].avatar_url : '/news/images/worm.jpg'
            } : false,
        }
        res.render('news/user', data)
    })()

})
//基本资料
router.all('/user/base_info', (req, res) => {
    (async function () {

        //拿到session中的user_id,判断用户是否登录
        let result = await common.getUserLogin(req, res);
        if (!result[0]) {
            res.redirect('/')
        }
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
            await handleDB(res, 'info_user', 'update', '数据库修改失败', `id=${result[0].id}`, {signature,nick_name,gender})
            //  3、返回操作成功
            res.send({errno:'0',errmsg:'操作成功'})
        }
    })()
})
//密码修改
router.all('/user/pass_info',(req,res)=>{
    (async function(){
         //拿到session中的user_id,判断用户是否登录
         let result = await common.getUserLogin(req, res);
         if (!result[0]) {
             res.redirect('/')
         }
         if(req.method=='GET'){
             res.render('news/user_pass_info')
         }else if(req.method=='POST'){
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
            if(new_password != new_password2){
                res.send({errmsg:'两次密码不一致'})
            }
            //  3、校验旧密码是否正确
            if(md5(md5(old_password)+keys.password_salt) !== result[0].password_hash){
                res.send({errmsg:'旧密码输入不正确，修改失败'})
                return
            }
            //  4、修改数据库中info_user的表的password_hash
            await handleDB(res,'info_user','update','数据库修改出错',`id=${result[0].id}`,{password_hash:md5(md5(new_password)+keys.password_salt)})
            //  5、返回操作成功
            res.send({errno:'0',errmsg:'操作成功'})
         }
    })()
})
module.exports = router;