const express = require('express');
const router = express.Router();
const Captcha = require('../utils/captcha/index'); //引入captcha的工具

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
    req.session['IMG_CODE']=captcha.text
    console.log(req.session);
    //配合img标签的src属性请求来展示验证码图片的时候，需要设置响应头
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(captcha.data);
    
})

module.exports = router;