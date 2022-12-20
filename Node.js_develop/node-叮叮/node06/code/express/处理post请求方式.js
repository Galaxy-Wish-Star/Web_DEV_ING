const express=require('express');
const app=express();
//自己写的模块
const rotuerPort=require('./routes/passport')

//将路由对象注册到app对象上
app.use(rotuerPort);
app.get('/',(req,res)=>{
    res.send('hello express框架')
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})