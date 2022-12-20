
const express=require('express');
const { template } = require('express-art-template');
const path=require('path');
const app=express();

app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//模板过滤器
template.defaults.imports.ageFliter=function(value){
    if(value <18){
        return value*2
    }
}
app.get('/',(req,res)=>{
    let dataList={
        ages: [17,18,19,20,21,22]
    }
   res.render('index.html',dataList)
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})
// for in 循环对象 key键值
// for of 需要迭代器 循环值