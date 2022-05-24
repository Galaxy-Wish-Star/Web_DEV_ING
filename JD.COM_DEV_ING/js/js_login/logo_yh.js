window.onload = function() {
    var smdl = document.querySelector('.login-tab-l');
    var zhanghu = document.querySelector('.login-tab-r');
    var sm = document.querySelector('.qrcode-login');
    var zh = document.querySelector('.login-box');
    var ts = document.querySelector('#phone-org');
    smdl.addEventListener('click', function() {
        sm.style.display = 'block';
        zh.style.display = 'none';
    })
    zhanghu.addEventListener('click', function() {
        zh.style.display = 'block';
        sm.style.display = 'none';
    })
    sm.addEventListener('mouseenter', function() {
        ts.style.display = 'block';
    })
    sm.addEventListener('mouseenter', function() {
        ts.style.display = 'none';
    })
    var pwd = document.querySelector('#nloginpwd');
    // 密码
    var zhangh = document.querySelector('#loginname');
    // 账号
    var gz1 = /^\d{8,20}$/;
    var btn = document.querySelector('#loginsubmit');
    // 登录按键
    btn.addEventListener('click', function() {
        if (zhangh.value == '' || pwd.value == '') {
            alert('账号密码不能为空');
        } else {
            if (gz1.test(zhangh.value) == false || gz1.test(pwd.value) == false) {
                alert('账号密码格式错误');
            } else {
                if (loginname.value == '11111111' && pwd.value == '11111111') {
                    alert('登陆成功！');
                    window.location.href = 'index.html';
                } else {
                    alert('账号密码有错!')
                }
            }
        }


    })












}