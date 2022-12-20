
const express=require('express');
const path=require('path');
const app=express();

app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/child.html',(req,res)=>{
    res.render('child')
})

app.get('/',(req,res)=>{
    let dataList={
        name:'张三',
        age:17,
        job:'前端工程师',
        childrens:['大毛','二毛','三毛']
    }
   res.render('index.html',dataList)
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})