window.onload = function() {
    var smdl = document.querySelector('.login-tab-l');
    var zhdl = document.querySelector('.login-tab-r');
    var sm = document.querySelector('.qrcode-login');
    var zh = document.querySelector('.login-box');
    var aaa = document.querySelector('#aaa');
    var loginbtn = document.querySelector('.login-btn');
    var loginname = document.querySelector('#loginname');
    var loginpwd = document.querySelector('#nloginpwd');
    var reg1 = /^[1][23456789][0-9]{9}$/;
    var reg2 = /^\w{8,20}$/;

    smdl.addEventListener('click', function() {

        sm.style.display = 'block';
        zh.style.display = 'none';
    })

    zhdl.addEventListener('click', function() {

        zh.style.display = 'block';
        sm.style.display = 'none';
    })
    sm.addEventListener('mouseenter', function() {

        aaa.style.display = 'block';
    })
    sm.addEventListener('mouseleave', function() {
        aaa.style.display = 'none';
    })
    loginbtn.addEventListener('click', function() {
        if (loginname.value == '' || loginpwd.value == '') {
            alert('密码和账号是空的');
        } else {
            if (reg1.test(loginname.value) == false || reg2.test(loginpwd.value) == false) {
                alert('密码和账号格式有误');
            } else {
                if (loginname.value == '15700300557' && loginpwd.value == '123456789') {
                    alert('登录成功');
                    window.location.href = 'index.html'
                } else {
                    alert('账号和密码不正确');
                }
            }
        }
    })


}