const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(cookieSession({
    name:"my_session",  //name为session名，自己起一个字符串就行
    keys:["$^%%&^&%$RT%&TYGSGSFRR554785432$#@$$#%$@#%"],  // 内部加密需要的keys， keys为随机字符串
    maxAge: 1000 * 60 * 60 * 24   // 过期时间
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.all('/', (req, res) => {
    if(req.method=="GET"){
        res.render('temp_login')
    }else if(req.method=="POST"){

        let {username, password} = req.body;
        if(username="nodejs"&&password=="123456"){
            // 状态保持，在session中保存登录用户名代表用户登录
            req.session["username"] = username;
            // 跳转到转账页面
            res.redirect("/transfer");
        }else{
            console.log("密码错误");
        }

    }
});
app.all('/transfer', (req, res) => {
    // 看看能不能获取到这个username，
    let username = req.session["username"];

    if(!username){ //获取不到表示没有登录, 要跳转到首页
        res.redirect("/");
    }

    if(req.method=="GET"){
        //设置token，将token保存在cookie中
        let csrf_token=getRandomString(48);
        res.cookie('csrf_token',csrf_token);
        res.render('temp_transfer')
    }else if(req.method=="POST"){
        //判断一下响应头中X-CSRFToken的值，和cookies中csrf_token进行对比
        console.log(req.cookies['csrf_token']);
        console.log(req.headers['x-csrftoken']);
        console.log(req.headers);
        //进行对比，如果是一样的，说明是合法请求，可以进行转账
        //如果不一致，说明伪造的请求，直接return,不执行后面的代码
        if(req.headers['x-csrftoken']===req.cookies['csrf_token']){
            console.log('验证通过');
        }else{
            res.send('验证不通过');
            return
        }


        let {to_account, money} = req.body;
        console.log(to_account, money);
        
        //执行转账功能： ....此处省略
        console.log("假装执行转账操作，将当前登录用户的钱转账到指定账户");
        console.log(`已经完成转账${money}元到账户${to_account}`);
        
        res.json({to_account,money});

    }
});


//生成随机字符串
function getRandomString(n){
    var str="";
    while(str.length<n){
      str+=Math.random().toString(36).substring(2);
    }
    return str.substring(str.length-n)
}
app.listen(8001, () => {
    console.log('Example app listening on port 8001!')
});