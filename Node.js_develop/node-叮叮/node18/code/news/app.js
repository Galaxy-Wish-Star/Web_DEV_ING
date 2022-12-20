const express=require('express');
const AppConfig = require('./config');
const app=express();
const port=3000;
//获取配置信息
new AppConfig(app);

app.listen(port,()=>{
    console.log(`服务器已经运行了,端口号为${port}`);
})
//css js 图片
//请求参数，get post pathinfo