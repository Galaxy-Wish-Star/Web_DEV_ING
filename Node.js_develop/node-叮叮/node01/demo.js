//导入数据
//导出的模块一般需要使用一个变量来接收，一般把接收的变量定义常量
const m1=require('./m1.js');
console.log(m1);
console.log(m1.a);
console.log(m1.getSum(1,2));


//模块里面this的指向的问题
//在node中this代表当前这个模块，也就是exports对象
console.log(this);
console.log(exports===this);

//node里面没有window对象，但是有全局对象global
//nodejs里面声明这个变量，不会被添加到global全局对象中
let b=10;
console.log(global.b);
//可以给global添加成员
global.c=30;
console.log(global===this);//false