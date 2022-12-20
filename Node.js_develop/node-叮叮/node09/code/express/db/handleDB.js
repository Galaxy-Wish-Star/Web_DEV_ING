const db = require('./nodejs-orm/index');

async function handleDB(res, tableName, methodName,errmsg, n1, n2) {

    let Students = db.model(tableName);
    let result;
    try {
        result = await new Promise((resolve, reject) => {
            if (!n1) {
                //传参，没有任何参数
                Students[methodName]((err, data) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(data)
                })
                return
            }
            //能够执行到这里来的话，说明有n1
            if (!n2) {
                //传了一个参数
                Students[methodName](n1, (err, data) => {
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(data)
                })
                return
            }
            //能到这里，说明传了两个参数
            //传了两个参数
            Students[methodName](n1, n2, (err, data) => {
                if (err) {
                    reject(err);
                    return
                }
                resolve(data)
            })
          

        })
    } catch (err) {
        console.log(err);
        res.send({
            errmsg:errmsg
        })
        return
    }
    return result
}



module.exports = handleDB;