//引入模块
const http = require("http");
const fs = require("fs");
const path = require("path");
//定义端口号
const port = 8080;
//创建服务器对象
const server = http.createServer((request, response) => {
	//每收到一次请求就会执行一次
	//判断浏览器的请求，需要什么文件
	let reqUrl = request.url;
	console.log(reqUrl);
	if (reqUrl == "/" || reqUrl == "/index.html") {
		let filePath = path.join(__dirname, "assets", "html", "index.html");
		let content = fs.readFileSync(filePath);
		response.end(content);
	} else if (reqUrl == "/cate.html") {
		let filePath = path.join(__dirname, "assets", "html", "cate.html");
		let content = fs.readFileSync(filePath);
		response.end(content);
	} else if (reqUrl.endsWith(".css")) {
		let filePath = path.join(__dirname, "assets", "css", "index.css");
		let content = fs.readFileSync(filePath);
		response.end(content);
	} else {
		response.end("404，报错了");
	}
});
//服务器监听
server.listen(port, (error) => {
	console.log("服务器运行成功");
});

//第三方模块，进行安装
//npm init项目初始化
//package.json记录项目相关信息
//-g全局安装
