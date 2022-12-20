const express=require('express');
//1、安装 cookie-parser
//2、引入
const cookieParser=require('cookie-parser');
const app=express();
//3、将cookie添加到 app
app.use(cookieParser());

//设置cookie
app.get('/set_cookie',(req,res)=>{
    res.cookie('name','nodejs',{maxAge:1000*60*60})
    res.cookie('age',20);
    res.send('设置了cookie')
})
//获取cookie
app.get('/get_cookie',(req,res)=>{
    let name=req.cookies.name
    let age=req.cookies['age'];
    res.send(`获取到了cookie,${name},${age}`)
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})