const express =require('express');
const db=require('./db/nodejs-orm/index');
const app=express();
app.get('/get_data',(req,res)=>{
    //使用ORM查询数据库
    //创建模型，需要操作哪一个数据库表
    let Students=db.model('students');
    //通过这个模型去做一系列的查询，修改等等数据库操作
    //修改全部的记录
    // Students.update({height:180},(err,result)=>{
    //     console.log(result);
    //     res.send('修改成功')
    // })
    //按条件进行修改,参数一是条件为字符串，参数二为对象
    // Students.update('id=4',{age:30,cls_id:5},(err,result)=>{
    //     console.log(result);
    //     res.send('修改成功')
    // })
    //如果使用orm的增删改查满足不了需求，使用自定义sql语句
    Students.sql('select gender from students  group by gender',(err,result)=>{
        res.send(result);
    })
    
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})

/*
登录：
1、获取用户名和密码，获取post参数，先查询用户名有没有被注册（回调函数），如果注册了
2、校验用户名和密码是否和数据库的内容匹配(回调函数)
回调函数嵌套回调函数（地狱回调）
使用一个更好的方法去书写代码，异步操作的终极方案(async+await)

*/