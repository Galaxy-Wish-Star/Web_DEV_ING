const express =require('express');
const db=require('./db/nodejs-orm/index');
const app=express();
app.get('/get_data',(req,res)=>{
    //使用ORM查询数据库
    //创建模型，需要操作哪一个数据库表
    let Students=db.model('students');
    //通过这个模型去做一系列的查询，修改等等数据库操作
    //查询所有的数据
    // Students.find((err,data)=>{
    //     res.send(data);
    // })
    //查询指定字段
    // Students.find(['name','age'],(err,data)=>{
    //     res.send(data);
    // })
    //按条件查询
    // Students.find('id=4',(err,data)=>{
    //     res.send(data);
    // })
    //分页查询
    // where 查询条件，可选项，number 第几页，count 表示每一页的条数
    Students.limit({where:'age>18',number:1,count:5},(err,data)=>{
        res.send(data);
    })
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})