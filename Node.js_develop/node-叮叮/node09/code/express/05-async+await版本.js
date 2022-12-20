const express = require('express');
const db = require('./db/nodejs-orm/index');
const app = express();
app.get('/get_data', (req, res) => {
    //自执行函数
    (async function () {
        //使用ORM查询数据库
        //创建模型，需要操作哪一个数据库表
        let Students = db.model('students');
        //result接收的是什么
        //如果查询成功，result接收数据库返回的数据data
        //如果查询失败，result接收错误err
        let result;
        try {
            result = await new Promise((resolve, reject) => {
                //如果使用orm的增删改查满足不了需求，使用自定义sql语句
                Students.find('id=4', (err, data) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(data)
                })

            })
        } catch (err) {
            console.log(err);
            //将错误打印给前端，errmsg->错误信息
            res.send({
                errmsg: '数据库查询出错'
            })
            return
        }


        
        //...
        res.send(result);
    })();


})
app.listen(3001, () => {
    console.log('express 启动成功');
})

/*
登录：
1、获取用户名和密码，获取post参数，先查询用户名有没有被注册（回调函数），如果注册了
2、校验用户名和密码是否和数据库的内容匹配(回调函数)
回调函数嵌套回调函数（地狱回调）
使用一个更好的方法去书写代码，异步操作的终极方案(async+await)

try/catch捕获异常，保障程序不会崩掉
*/