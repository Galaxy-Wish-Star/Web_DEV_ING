const express=require('express');
const app=express();

const db=require('./db/db');
app.get('/get_data',(req,res)=>{
    // console.log(db.query);
    db.query('select * from students where age > 18 or height >= 180.00;',(err,data)=>{
        if(err){
            console.log(err);
            return
        }
        res.send(data)
    })
   
})
app.listen(3000,()=>{
    console.log('express 成功');
})