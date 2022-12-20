/*
        自己创建三个txt文件，第一个 内容为 “我”，第二个内容为 “爱”，第三个内容为 “前端”
        每一个文件中都有一个文字，使用所学的node知识(fs.readFile(异步))顺序读取三个文件中的内容，
        然后组成一串“我爱前端”的字符串，并且写入到date.txt(自己创建)文件里面。  
*/
//引入模块
const fs=require('fs');
const path=require('path');

//获取文件的路径
let fileOne=path.join(__dirname,'1.txt');
let fileTwo=path.join(__dirname,'2.txt');
let fileThree=path.join(__dirname,'3.txt');
let fileDate=path.join(__dirname,'date.txt');

//读取文件中的内容
fs.readFile(fileOne,'utf-8',(error1,data1)=>{
    if(error1){
        console.log(error1);
        return
    }
  
    fs.readFile(fileTwo,'utf-8',(error2,data2)=>{
        if(error2){
            console.log(error2);
            return
        }
        fs.readFile(fileThree,'utf-8',(error3,data3)=>{
            if(error3){
                console.log(error3);
                return
            }
    
          fs.writeFile(fileDate,data1+data2+data3,'utf-8',(error)=>{
              console.log('写入成功');
          })
        
        })
    
    })

})
