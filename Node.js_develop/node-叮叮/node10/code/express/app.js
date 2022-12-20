const express=require('express');
const app=express();
const path=require('path');
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'development'
});
app.set('views', path.join(__dirname, 'views'));                                                                                                              
app.set('view engine', 'html');

app.get('/index.html',(req,res)=>{
    res.render('index');
})
app.get('/login.html',(req,res)=>{
    res.render('login');
})
app.get('/get_data',(req,res)=>{
    let data={
        user:'张三',
        age:30
    }
    res.send(data);
})
app.post('/login_post',(req,res)=>{
    req.on('data',(postdata)=>{
        console.log(JSON.parse( postdata.toString()).username);
        console.log(JSON.parse( postdata.toString()).password);
        //验证...
    })
})

app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(3000,()=>{
    console.log('express成功');
})