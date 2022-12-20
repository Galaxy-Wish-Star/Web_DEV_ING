const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');

//获取静态资源
app.use(express.static(path.join(__dirname,'public')))//指定在本地public下找静态资源
app.get('/index.html',(req,res)=>{
    //获取文件的路径
    let filePath=path.join(__dirname,'views','index.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
})
app.get('/',(req,res)=>{
    res.send('hello express框架')
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})