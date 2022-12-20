//引入fs模块
const fs=require('fs');
//引入path模块
const path=require('path');
let filePath=path.join(__dirname,'hello.txt');
//异步读取，需要三个参数，第三个回调函数
fs.readFile(filePath,'utf-8',(error,date)=>{
    if(error){//如果读取文件成功，error是null
        console.log(error);
        return
    }
    console.log(date);
})
console.log('你好');