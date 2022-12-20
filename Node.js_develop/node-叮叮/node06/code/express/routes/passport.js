//抽取路由
//第一步还是引入express
const express=require('express');
//创建路由对象
const rotuerPort=express.Router();
const fs=require('fs');
const path=require('path');

//引入body-parser模块
const bodyParser=require('body-parser');

//将body-parser功能添加项目app中
rotuerPort.use(bodyParser.urlencoded({extended:false}));//false接收的值为字符串或者数组，true为任意类型
rotuerPort.use(bodyParser.json());//解析json格式



rotuerPort.get('/register.html',(req,res)=>{
    let filePath=path.join(__dirname,'views','register.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
})
//在接口中获取参数
rotuerPort.post('/register.html',(req,res)=>{
    let body= req.body;
    let {username,email,password}=body;
    console.log(body);
    console.log(username,email,password);
    res.send('post提交成功')


})
rotuerPort.get('/index.html',(req,res)=>{
    let filePath=path.join(__dirname,'../views','index.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
})

//导入路由模块
//自己的写的模块需要导出的
module.exports=rotuerPort