//安装express

//1、引入express
const express=require('express');
//2、创建app对象（app项目对象）
const app=express();
//4、处理请求
//第一个参数是请求路径，第二个参数是针对于这个路径的处理函数
app.get('/',(req,res)=>{
    //函数有两个形参
    //第一形参req是请求对象，第二个参数res是响应对象
    res.send('hello express框架')
})
//3、监听是否有请求
app.listen(3001,()=>{
    console.log('express 启动成功');
})