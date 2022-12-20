const http = require("http");
const port = 8080;
//引入新的模块
const url = require("url");
const server = http.createServer((request, response) => {
	//这里的代码每收到一次请求就会执行一次
	//request请求对象 response响应对象

	//获取请求路径
	let reqUrl = request.url;
	console.log(reqUrl);

	//获取请求方式
	let reqMethod = request.method;
	console.log(reqMethod);

	response.end("hello nodejs http");

	//获取get请求参数
	let parse = url.parse(reqUrl, true); //true解析成一个对象，false解析成一个字符串
	console.log(parse.query);
	console.log(parse.query.name);
	console.log(parse.query.age);
});
server.listen(port, (error) => {
	// console.log(error);//如果没有报错，undefined
	console.log("服务器已经运行成功了");
});
