window.onload = function() {
    var btn = document.querySelector("#btn");
    btn.onclick = function() {
        alert("你点到我了！");
        console.log("傻逼");
    }
    var phone = document.querySelector("#phone");
    var pmp1 = document.querySelector("#pmp1");
    var pmptxt1 = document.querySelector("#pmptxt1");
    var reg1 = /^[1][356789][0-9]{9}$/;
    var banner = document.querySelector(".banner");
    var banimgs = banner.querySelectorAll("img");
    var index = 0;
    console.log(banimgs);
    t = setInterval(function() {
        if (index == banimgs.length - 1) {
            index = 0;
        } else {
            index++;
        }
        for (var i = 0; i < banimgs.length; i++) {
            banimgs[i].className = '';
        }
        banimgs[index].className = 'show';
    }, 2000)
    banner.onmouseenter = function() {
        clearInterval(t);
    }
    banner.onmouseout = function() {
        t = setInterval(function() {
            if (index == banimgs.length - 1) {
                index = 0;
            } else {
                index++;
            }
            for (var i = 0; i < banimgs.length; i++) {
                banimgs[i].className = '';
            }
            banimgs[index].className = 'show';
        }, 2000)
    }
    phone.addEventListener('focus', function() {

        if (this.value == '') {
            pmp1.style.display = 'block';
            pmptxt1.innerText = '请输入手机号码！！';
        } else {
            pmp1.style.display = 'none';
        }
    });
    phone.addEventListener('blur', function() {
        if (this.value == '') {
            pmp1.style.display = 'block';
            pmptxt1.innertext = '手机号不能为空！！';
        } else {
            if (reg1.test(this.value) == true) {
                pmp1.style.display = 'none';
            } else {
                pmp1.style.display = 'block';
                pmptxt1.innerText = '手机号码格式错误！！';
            }
        }
    });
    var Emails = document.querySelector("#Emails");
    var pmp2 = document.querySelector("#pmp2");
    var pmptxt2 = document.querySelector("#pmptxt2");
    var reg2 = /^[a-zA-Z0-9]{1,}@{1}\w+\.{1}\w+$/;
    Emails.addEventListener('focus', function() {

        if (this.value == '') {
            pmp2.style.display = 'block';
            pmptxt2.innerText = '请输入邮箱！！';
        } else {
            pmp2.style.display = 'none';
        }
    });
    Emails.addEventListener('blur', function() {
        if (this.value == '') {
            pmp2.style.display = 'block';
            pmptxt2.innerText = '邮箱号号不能为空！！';
        } else {
            if (reg2.test(this.value) === true) {
                pmp2.style.display = 'none';
            } else {
                pmp2.style.display = 'block';
                pmptxt2.innerText = '邮箱号码格式错误！！';
            }
        }
    });
    var password = document.querySelector("#password");
    var pmp3 = document.querySelector("#pmp3");
    var pmptxt3 = document.querySelector("#pmptxt3");
    var grade1 = document.querySelector('#grade1');
    var grade2 = document.querySelector('#grade2');
    var grade3 = document.querySelector('#grade3');
    var n = 0;
    var rag3 = /^\d{8,20}$/; //3密码强度为0
    var rag4 = /^[A-z0-9~!@#$%^&*()_+`\-={}:";'<>?,.\/]{8,20}$/; //4密码强度为0
    var rag5 = /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
    var rag6 = /^(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/; //43组合密码强度为一
    var rag7 = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/; //567组合密码强度为二
    var rag8 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/; //判断密码最高强度三

    function checkStrong(password) {
        if (rag8.test(password.value) == true) {
            n = 3;
        } else {
            if (rag5.test(password.value) == true || rag6.test(password.value) == true || rag7.test(password.value) == true) {
                n = 2;
            } else {
                if (rag4.test(password.value) == true) {
                    if (rag3.test(password.value) == true) {
                        n = 0;
                    } else {
                        n = 1;
                    }
                } else {
                    n = -1;
                }
            }
        }
        return n;
    }
    password.addEventListener('focus', function() {
        if (this.value == '') {
            pmp3.style.display = 'block';
            pmptxt3.innerText = '请输入8-20位密码';
            pmptxt3.style.width = '216px';
            grade1.style.backgroundColor = '#f1eace';
            grade2.style.backgroundColor = '#f1eace';
            grade3.style.backgroundColor = '#f1eace';
        }
        /*else {
                   pmptxt3.style.display = 'none';
               }*/
    })
    password.addEventListener('blur', function() {
        if (this.value == '') {
            pmptxt3.innerText = '密码不能为空';
            pmp3.style.width = '216px';
            grade1.style.backgroundColor = '#f1eace';
            grade2.style.backgroundColor = '#f1eace';
            grade3.style.backgroundColor = '#f1eace';
        } else {
            pwdlevel = checkStrong(password);
            switch (pwdlevel) {
                case 0:
                    pmp3.style.display = 'block';
                    pmptxt3.innerText = '密码过于简单有被盗风险';
                    pmp3.style.width = '216px';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#f1eace';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
                case 1:
                    pmp3.style.display = 'none';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#f1eace';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
                case 2:
                    pmp3.style.display = 'none';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#016941';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
                case 3:
                    pmp3.style.display = 'none';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#016941';
                    grade3.style.backgroundColor = '#016941';
                    break;
                default:
                    pmp3.style.display = 'block';
                    pmptxt3.innerText = '密码需为8-20个字符,由字母、数字或符号组成';
                    pmp3.style.width = '300px';
                    grade1.style.backgroundColor = '#f1eace';
                    grade2.style.backgroundColor = '#f1eace';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
            }
        }
    })


}