const handleDB=require('../db/handleDB');
//公共的工具函数
function getRandomString(n) {
    var str = "";
    while (str.length < n) {
        str += Math.random().toString(36).substring(2);
    }
    return str.substring(str.length - n)
}
//csrfProtect钩子函数，执行某一个函数之前和之后可能会执行其他指定的函数，这类函数我们叫做钩子函数
function csrfProtect(req, res, next) {
    // console.log("-------------------------------------csrfProtect")
    let method = req.method
    if (method == "GET") {
        let csrf_token = getRandomString(48);
        res.cookie('csrf_token', csrf_token);
        //next看为是下一个函数
        next() //执行跳转到下一个函数执行，即app.use(beforeReq,router)中的下一个
    } else if (method == "POST") {
        // 判断请求头中的x-csrftoken值，和cookies中的csrf_token进行对比
        console.log(req.headers["x-csrftoken"]);
        console.log(req.cookies["csrf_token"]);

        if ((req.headers["x-csrftoken"] === req.cookies["csrf_token"])) {
            console.log("csrf验证通过！");
            next()
        } else {
            res.send({
                errmsg: "csrf验证不通过!！"
            });
            return
        }
    }
}


async function getUserLogin(req,res) {
    //拿到session中的user_id,判断用户是否登录
    let user_id = req.session['user_id'];
    //查询数据库，再拿到数据库中id的用户信息
    let result = [];
    if (user_id) {
        result = await handleDB(res, 'info_user', 'find', 'info_user数据库查询出错', `id=${user_id}`)
    }
    return result
}

async function abort404(req,res){
    let result = await getUserLogin(req, res);
    let data = {
        user_info: result[0] ? {
            nick_name: result[0].nick_name,
            avatar_url: result[0].avatar_url
        } : false,
    }
    res.render('news/404', data);
}

module.exports = {
    csrfProtect,
    getUserLogin,
    abort404
}