const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
//引入body-parser模块
const bodyParser=require('body-parser');

//将body-parser功能添加项目app中
app.use(bodyParser.urlencoded({extended:false}));//false接收的值为字符串或者数组，true为任意类型
app.use(bodyParser.json());//解析json格式

app.get('/register.html',(req,res)=>{
    let filePath=path.join(__dirname,'views','register.html');
    //获取文件的信息
    let content=fs.readFileSync(filePath,'utf-8');
    res.send(content)
})
//在接口中获取参数
app.post('/register.html',(req,res)=>{
    let body= req.body;
    let {username,email,password}=body;
    console.log(body);
    console.log(username,email,password);
    res.send('post提交成功')
    //后端业务逻辑
    //获取请求参数
    //对参数进行处理
    //查询数据库，判断用户名是否注册

})
app.get('/',(req,res)=>{
    res.send('hello express框架')
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})