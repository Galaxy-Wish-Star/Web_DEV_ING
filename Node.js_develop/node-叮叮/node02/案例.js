//把当前文件夹的js文件的名字都添加前缀node-
//引入fs模块
const fs=require('fs');
let paths=fs.readdirSync(__dirname);
console.log(paths);
//循环，拿到列表每一位
// paths.forEach(item=>{
//     if(item.endsWith('.js')){
//         fs.renameSync(item,`node-${item}`)
//     }
// })

//把当前文件夹的js文件的名字都删除前缀node-
paths.forEach(item=>{
    if(item.startsWith('node-')){
        //node-buffer数据类型.js
        fs.renameSync(item,item.substring('node-'.length))
    }
})
