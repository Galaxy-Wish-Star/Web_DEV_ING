const express =require('express');
const db=require('./db/nodejs-orm/index');
const app=express();
app.get('/get_data',(req,res)=>{
    //使用ORM查询数据库
    //创建模型，需要操作哪一个数据库表
    let Students=db.model('students');
    //通过这个模型去做一系列的查询，修改等等数据库操作
    //按条件删除删除数据（物理删除）
    // Students.delete('id=15',(err,result)=>{
    //     console.log(result);
    //     res.send('删除成功')
    // })
    //清空表里面所有的内容,无参数
    Students.delete((err,result)=>{
        console.log(result);
        res.send('删除成功')
    })
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})