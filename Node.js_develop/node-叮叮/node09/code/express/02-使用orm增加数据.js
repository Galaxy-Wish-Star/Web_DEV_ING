const express =require('express');
const db=require('./db/nodejs-orm/index');
const app=express();
app.get('/get_data',(req,res)=>{
    //使用ORM查询数据库
    //创建模型，需要操作哪一个数据库表
    let Students=db.model('students');
    //通过这个模型去做一系列的查询，修改等等数据库操作
    //增加单条记录
    // Students.insert({name:'成龙',age:40},(err,result)=>{
    //     console.log(result);
    //     res.send('添加成功');
    // })
    //增加多条记录
    Students.insert([{name:'周润发',age:45},{name:'梁朝伟',age:39}],(err,result)=>{
        console.log(result);
        res.send('添加成功');
    })
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})