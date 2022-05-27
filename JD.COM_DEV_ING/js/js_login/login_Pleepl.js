window.onload = function() {
    // 获取对应元素
    var smdl = document.querySelector('#smdl');
    var zhdl = document.querySelector('#zhdl');
    var sm = document.querySelector('.qrcode-login ');
    var zh = document.querySelector('.login-box');
    var mc = document.querySelector('.mc');
    var hoer = document.querySelector('#phone-org')
    var phoneorg = document.querySelector('#qrcodelog');
    phoneorg.addEventListener('mouseenter', function() {
        hoer.style.display = 'block';
    })
    phoneorg.addEventListener('mouseleave', function() {
        hoer.style.display = 'none';
    })

    smdl.addEventListener('click', function() {
        sm.style.display = 'block';
        zh.style.diasplay = 'none';
        mc.style.display = 'none';
        smdl.style.color = 'red';
        smdl.style.fontWeight = 'bold';
        zhdl.style.fontWeight = 'normal';
        zhdl.style.color = '#666';
    })

    zhdl.addEventListener('click', function() {
            sm.style.display = 'none';
            zh.style.diasplay = 'block';
            mc.style.display = 'block';
            zhdl.style.color = 'red';
            zhdl.style.fontWeight = 'bold';
            smdl.style.fontWeight = 'normal';
            smdl.style.color = '#666';
        })
        // 账户验证
    var loginbtn = document.querySelector('.login-btn');
    var loginname = document.querySelector('#loginname');
    var loginpwd = document.querySelector('#loginpwd');


    var gz1 = /^[1][3-9][0-9]{9}$/;
    var gz2 = /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
    loginbtn.addEventListener('click', function() {
        if (loginname.valve == '' || loginpwd.value == '') {
            alert('账号或密码不能为空！');
        } else {
            if (gz1.test(loginname.value) == false || gz2.test(loginpwd.value) == false) {
                alert('账号或密码格式错误！');
            } else {
                if (loginname.value == '14780032117' && loginpwd.value == "12345678pl") {
                    alert('登录成功！');
                    window.location.href = '../index_Pleepl.html';
                } else {
                    alert('用户不存在！');
                }
            }
        }




    })








}