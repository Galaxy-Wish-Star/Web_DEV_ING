const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');

app.get('/index.html',(req,res)=>{
    //获取文件的路径
    let filePath=path.join(__dirname,'views','index.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
    //获取get请求参数
    let query=req.query;
    console.log(query);
    console.log(query.name,query.age);

})
app.get('/',(req,res)=>{
    res.send('hello express框架')
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})