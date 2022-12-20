const fs=require('fs');
const path=require('path');
let filePath=path.join(__dirname,'hello.txt');
//异步写入(临时的处理，保存少量的数据)
// fs.writeFile(文件路径，写入的内容，'utf-8',回调函数)
// fs.writeFile(filePath,'hello~world','utf-8',(error)=>{
//     if(error){
//         console.log(error);
//         return
//     }
//     console.log('写入成功');
// })
//写入不是叠加，而是进行覆盖
//保存数据是在数据库中

//常用的方法
//修改文件名
// fs.renameSync(就文件名，新文件名);
// fs.renameSync('hello.txt','hello01.txt');

//fs.readdirSync获取当前路径下所有的文件名列表
let paths=fs.readdirSync(__dirname);
console.log(paths);

let str='hello';
console.log(str.endsWith('lo'));//true
console.log(str.startsWith('e'));//false
console.log(str.substring(2));//从下标2开始截取到最后
console.log(str.substring(2,3));//下标2->3（不包含3）（包头不包尾）