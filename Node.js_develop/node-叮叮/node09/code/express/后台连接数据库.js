const express =require('express');
const db=require('./db/db');
const app=express();
app.get('/get_data',(req,res)=>{
    // console.log(db.query);
    db.query('select * from students where id=4;',(err,data)=>{
        if(err){
            console.log(err);
            return
        }
        res.send(data)
    })
    
})
app.listen(3001,()=>{
    console.log('express 启动成功');
})