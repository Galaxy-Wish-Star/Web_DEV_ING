//引入path模块
const path=require('path');

//两个特殊的变量(注意)
console.log(__dirname);//当前执行的文件绝对路径，不包含文件名(常用)
console.log(__filename);//当前执行的文件绝对路径，包含文件名

let extname=path.extname(__filename);//获取指定文件名的扩展名(后缀名)
// console.log(extname);

let basename=path.basename(__filename);//获取指定文件名
// console.log(basename);

let dirname=path.dirname(__filename);//获取指定文件名当前所在的绝对的路径
// console.log(dirname);

let parse=path.parse(__filename);//获取路径解析成一个字符串的对象
console.log(parse);

//拼接操作(可以拿到某一个文件的路径的完整态)
//多一层目录，就多一个参数
let fullPath=path.join(__dirname,'module','m1.js')
console.log(fullPath);

