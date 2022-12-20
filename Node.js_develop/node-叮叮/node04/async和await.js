// function getSum(a,b){
//     return a+b
// }
// let a1=getSum(1,2);
// let a2=getSum(3,4);
// let a3=getSum(5,6);
// console.log(a1+a2+a3);

//引入模块
const fs = require("fs");
const path = require("path");

//获取文件的路径
let fileOne = path.join(__dirname, "1.txt");
let fileTwo = path.join(__dirname, "2.txt");
let fileThree = path.join(__dirname, "3.txt");
let fileDate = path.join(__dirname, "date.txt");

//封装一个函数
function readFilePromise(fileName) {
	return new Promise((resolve, reject) => {
		//异步操作
		fs.readFile(fileName, "utf-8", (error, data) => {
			if (error) {
				reject(error);
			}
			resolve(data); //data就是读取到内容
		});
	});
}

//await必须放在async function函数内部
//async function（异步函数）需要调用
//多了一个await，外观同步执行的，实质上还是异步的，
//执行第一个异步操作之后，再去执行第二个异步操作
//async await一般后面就是接promise对象
async function func() {
	console.log(3);
	let p1 = await readFilePromise(fileOne); //我 直接拿到promsie对象成功resolve的数据
	console.log(4);
	let p2 = await readFilePromise(fileTwo); //爱
	let p3 = await readFilePromise(fileThree); //前端
	// fs.writeFile(fileDate, p1 + p2 + p3, 'utf-8', (error) => {
	//     console.log('写入成功');
	// })
}
console.log(1);
func();
console.log(2);
