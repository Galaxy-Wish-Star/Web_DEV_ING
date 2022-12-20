
const express=require('express');
const path=require('path');
const app=express();

// view engine setup
//模板引擎初始化的工作
app.engine('html', require('express-art-template'));
//项目环境的设置
//production生产模式，线上模式
//development 开发模式
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
//设置在在哪一个目录下查抄html文件
app.set('views', path.join(__dirname, 'views'));
//设置模板的后缀名
app.set('view engine', 'html');

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