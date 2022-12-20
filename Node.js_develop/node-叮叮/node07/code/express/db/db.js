var mysql = require("mysql")
//数据库连接的基本配置
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"test"
})

//对数据库进行增删改查操作的基础
//通过我们的sql在写一个回调函数
function query(sql,callback){
    //getConnection连接，pool连接池(就好比一个池塘，里面有很多鱼，就像会收到很多请求，所以会有一个连接池)
    //下面的这些方法不是我们想象的，而是mysql的固定写法
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            //错误，还有一个是记录，也就是查询到的记录
            callback(err,rows)
            connection.release()
        })
    })
}


exports.query = query