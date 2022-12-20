const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
app.get('/register.html',(req,res)=>{
    let filePath=path.join(__dirname,'views','register.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
})
app.get('/login.html',(req,res)=>{
    let filePath=path.join(__dirname,'views','login.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
})
//重定向
app.post('/register.html',(req,res)=>{
    //使用重定向跳转页面
    res.redirect('/login.html')
})
app.get('/',(req,res)=>{
    res.send('hello express框架')
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})