const express = require('express');
const router = express.Router();
const Captcha = require('../utils/captcha/index'); //引入captcha的工具
const handleDB = require('../db/handleDB');
const md5=require('md5');
const keys=require('../keys');
router.get('/passport/image_code/:float', (req, res) => {
    //生成验证码
    let captchaObj = new Captcha();
    let captcha = captchaObj.getCode();
    //验证码的文本信息
    console.log(captcha.text);
    //验证码的图片信息
    // console.log(captcha.data);

    //将验证码的文本信息存入session中
    //后面点击注册的时候，注册接口需要获取到验证码文本和用户输入的进行对比
    req.session['IMG_CODE'] = captcha.text
    console.log(req.session);
    //配合img标签的src属性请求来展示验证码图片的时候，需要设置响应头
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(captcha.data);

})

//注册接口
router.post('/passport/register', (req, res) => {
    //分析注册功能需要完成哪些事情
    //1、获取post请求参数，判空
    req.on('data', (postdata) => {
        (async function () {
            // console.log(postdata.toString());
         
            let {
                username,
                image_code,
                password,
                agree
            } = JSON.parse(postdata.toString());
        
            if (!username || !image_code || !password || !agree) {
                res.send({
                    errmsg: '缺少参数'
                })
                return
            }

            //2、验证图片验证码是否正确，如果不正确，就直接return
            if (image_code.toLowerCase() !== req.session['IMG_CODE'].toLowerCase()) {
                res.send({
                    errmsg: '验证码错误'
                })
                return
            }
            //3、查询数据库，看看用户名是否被注册了
            let result = await handleDB(res, 'info_user', 'find', 'info_user数据库查询出错', `username="${username}"`);
            //4、如果已经存在了，返回用户名已经被注册了，并且进行return
            //查询到了，result->数组[{字段...}]
            //没有查询到，result->空数组[]
            if (result.length > 0) {
                res.send({
                    errmsg: '用户名已经被注册了'
                })
                return
            }
            //5、如果不存在呢，往数据库中添加一条记录
            //双重md5加盐加密
            let ret=md5(md5(password)+keys.password_salt);//#$%#@^@$#^#$%@$%@#$%$%!%就是盐
            console.log(ret);
            let result2 = await handleDB(res, 'info_user', 'insert', '数据库插入出错', {
                username,
                nick_name: username,
                password_hash: ret
            })
            //6、保持登录状态,insertId
            req.session['user_id'] = result2.insertId;
            //7、返回响应成功
            res.send({
                errno: '0',
                errmsg: '注册成功'
            });
        })()

    })

})

//登录接口
router.post('/passport/login', (req, res) => {
    //分析登录业务流程
    //1、获取post请求参数(用户名和密码)，判空
    req.on('data', (postdata) => {
        (async function () {
            let {
                username,
                password,
            } = JSON.parse(postdata.toString());
            if (!username || !password) {
                res.send({
                    errmsg: '缺少参数'
                })
                return
            }
            //2、查询数据库，判断用户名是否已经注册了
            let result = await handleDB(res, 'info_user', 'find', 'info_user查询出错', `username="${username}"`)
            //查询到了，result->数组[{字段...}]
            //没有查询到，result->空数组[]
            //3、如果没有注册，返回用户名未注册，并且return
            if(!result.length){
                res.send({errmsg:'用户名未注册'});
                return
            }
            // console.log(result);
            //4、如果注册了，校验密码是否正确，如果不正确就return
            if(md5(md5(password)+keys.password_salt) !== result[0].password_hash){
                res.send({errmsg:'用户名或密码不正确，请输入正确的用户名和密码'})
                return
            }
            //5、保持用户登录状态
            req.session['user_id']=result[0].id;
            //6、返回登录成功
            res.send({errno:'0',errmsg:'登录成功'});
        })()

    })

})
//退出登录接口
router.post('/passport/logout',(req,res)=>{
    //删除session
    delete req.session['user_id'];
    res.send({errno:'0',errmsg:'退出登录成功'})
})
module.exports = router;