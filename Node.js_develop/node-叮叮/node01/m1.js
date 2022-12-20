let a=10;
function getSum(a,b){
    return a+b
}
//导出方式一
exports.a=a;
exports.getSum=getSum;

//导出方式二
//通过module.exports等于一个对象，来导出数据
module.exports={
    a,getSum
}