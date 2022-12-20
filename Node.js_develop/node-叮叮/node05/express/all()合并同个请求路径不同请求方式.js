const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
//引入body-parser模块
const bodyParser=require('body-parser');

//将body-parser功能添加项目app中
app.use(bodyParser.urlencoded({extended:false}));//false接收的值为字符串或者数组，true为任意类型
app.use(bodyParser.json());//解析json格式

//使用all()进行合并
app.all('/register.html',(req,res)=>{
    //获取请求方式
    let method=req.method;
    //判断请求方式
    if(method =='GET'){
        let filePath=path.join(__dirname,'views','register.html');
        //获取文件的信息
        let content=fs.readFileSync(filePath,'utf-8');
        res.send(content)
    }else if(method == 'POST'){
        let body= req.body;
        let {username,email,password}=body;
        console.log(body);
        console.log(username,email,password);
        res.send('post提交成功')
    }
})

app.get('/',(req,res)=>{
    res.send('hello express框架')
})

app.listen(3001,()=>{
    console.log('express 启动成功');
})