const express=require('express');
//1、安装 cookie-session
//2、引入
const cookieSession=require('cookie-session');

const app=express();
//3、将cookie添加到 app
app.use(cookieSession({
    name:'my_session',//session的名字
    keys:['$sfakjlfhjFJSKLGJSKDFN'],//内部加密需要keys
    maxAge:1000*60*60
}));

//设置cookie
app.get('/set_session',(req,res)=>{
    req.session['name']='session_nodejs'
    req.session['age']=20
    res.send('设置了session')
})
//获取cookie
app.get('/get_session',(req,res)=>{
    let name=req.session.name
    let age=req.session['age'];
    res.send(`获取到了session,${name},${age}`)
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})