//引入模块
const fs=require('fs');
const path=require('path');

//获取文件的路径
let fileOne=path.join(__dirname,'1.txt');
let fileTwo=path.join(__dirname,'2.txt');
let fileThree=path.join(__dirname,'3.txt');
let fileDate=path.join(__dirname,'date.txt');

//封装一个函数
function readFilePromise(fileName){
    return new Promise((resolve,reject)=>{
        //异步操作
        fs.readFile(fileName,'utf-8',(error,data)=>{
            if(error){
               reject(error);
            }
            resolve(data)//data就是读取到内容
        })
    })
}
let p1=readFilePromise(fileOne);
let p2=readFilePromise(fileTwo);
let p3=readFilePromise(fileThree);

//定义全局变量，接收文件的内容
let str=''
p1.then((value)=>{
    str+=value;
    return p2
}).then((value)=>{
    str+=value;
    return p3
}).then((value)=>{
    str+=value;
    console.log(str);
})


