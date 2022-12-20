//引入fs模块
const fs=require('fs');
//引入path模块
const path=require('path');
let filePath=path.join(__dirname,'hello.txt');
console.log(filePath);
//使用fs的方法(sync同步)
// fs.readFileSync(文件路径)
let content=fs.readFileSync(filePath);
console.log(content.toString());//通过toString转换Buffer对象
//使用utf-8转换Buffer
let content01=fs.readFileSync(filePath,'utf-8');
console.log(content01);
console.log('你好');