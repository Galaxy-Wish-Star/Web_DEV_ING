const http = require('http');
const port = 8080;
const server = http.createServer((request, response) => {
    //这里的代码每收到一次请求就会执行一次
    //request请求对象 response响应对象
    //获取账号和密码，获取post请求的参数
    //以事件的方式来接收,事件名就是data,触发post请求，就会触发这个代码
    request.on('data',(postData)=>{
        // postData就是接收到请求参数
        console.log(postData.toString());
    })


    response.end('hello nodejs http');



})
server.listen(port, (error) => {
    // console.log(error);//如果没有报错，undefined
    console.log('服务器已经运行成功了');
})