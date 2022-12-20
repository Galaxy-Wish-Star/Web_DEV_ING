// async function func(){
//     let data1=await 123;
//     //如果await后面接的是基本数据类型，会对这个基本数据类型进行包装，包装成一个promise对象
//     return data1
// }
// let a1=func();
// console.log(a1);//Promise { <pending> }
// a1.then((value)=>{
//     console.log(value);
// })

//错误处理(外部处理)
// async function func(){
//     let data1=await new Promise((resolve,reject)=>{reject('错误')})
//     //如果await后面接的是基本数据类型，会对这个基本数据类型进行包装，包装成一个promise对象
//     return data1
// }
// let a1=func();
// console.log(a1);//Promise { <pending> }
// a1.catch((reason)=>{
//     console.log(reason);
// })


//错误处理(内部处理)try/catch(可以保证项目代码可以完整运行)
async function func(){
    try{
        let data1=await new Promise((resolve,reject)=>{reject('错误')})
        //如果await后面接的是基本数据类型，会对这个基本数据类型进行包装，包装成一个promise对象
        return data1
    }catch(error){
        console.log(error);
    }
    
}
let a1=func();
console.log(a1);//Promise { <pending> }
