window.onload = function() {
    // 手机号验证
    //1.获取元素 =表示赋值 右边给左边
    var phone = document.querySelector('#phone');
    var sjts = document.querySelector('#sjts');
    var wzts1 = document.querySelector('#wzts1');
    // 2.设置手机号验证规则-正则表达式(/^开始 $/结束)
    var gz1 = /^[1][3-9][0-9]{9}$/;
    // {9}只管[0-9]
    // 3.手机号文本框获取焦点或失去焦点时的提示事件
    phone.addEventListener('focus', function() {
            if (this.value == '') {
                sjts.style.display = 'block';
                wzts1.innerText = '请输入手机号码！';
            } else {
                sjts.style.display = 'none';
            }


        })
        // focus 获得焦点
    phone.addEventListener('blur', function() {
        // sjts.style.display = 'none';
        if (this.value == '') {
            wzts1.innerText = '手机号不能为空！';
        } else {
            if (gz1.test(this.value) === true) {
                sjts.style.display = 'none';
            } else {
                sjts.style.display = 'block';
                wzts1.innerText = '手机号格式错误！';
            }
        }

    })
    var Emails = document.querySelector("#Emails");
    var sjts1 = document.querySelector("#sjts1");
    var wzts2 = document.querySelector("#wzts2");
    var reg2 = /^[a-zA-Z0-9]{1,}@{1}\w+\.{1}\w+$/;
    Emails.addEventListener('focus', function() {

        if (this.value == '') {
            sjts1.style.display = 'block';
            wzts2.innerText = '请输入邮箱！！';
        } else {
            sjts1.style.display = 'none';
        }
    });
    Emails.addEventListener('blur', function() {
        if (this.value == '') {
            sjts1.style.display = 'block';
            wzts2.innerText = '邮箱号号不能为空！！';
        } else {
            if (reg2.test(this.value) === true) {
                sjts1.style.display = 'none';
            } else {
                sjts1.style.display = 'block';
                wzts2.innerText = '邮箱号码格式错误！！';
            }
        }
    });
    var password = document.querySelector("#password");
    var sjts2 = document.querySelector("#sjts2");
    var wzts3 = document.querySelector("#wzts3");
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
            sjts2.style.display = 'block';
            wzts3.innerText = '请输入8-20位密码';
            wzts3.style.width = '216px';
            grade1.style.backgroundColor = '#f1eace';
            grade2.style.backgroundColor = '#f1eace';
            grade3.style.backgroundColor = '#f1eace';
        }
        /*else {
                   wzts3.style.display = 'none';
               }*/
    })
    password.addEventListener('blur', function() {
        if (this.value == '') {
            wzts3.innerText = '密码不能为空';
            sjts2.style.width = '216px';
            grade1.style.backgroundColor = '#f1eace';
            grade2.style.backgroundColor = '#f1eace';
            grade3.style.backgroundColor = '#f1eace';
        } else {
            pwdlevel = checkStrong(password);
            switch (pwdlevel) {
                case 0:
                    sjts2.style.display = 'block';
                    wzts3.innerText = '密码过于简单有被盗风险';
                    sjts2.style.width = '216px';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#f1eace';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
                case 1:
                    sjts2.style.display = 'none';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#f1eace';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
                case 2:
                    sjts2.style.display = 'none';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#016941';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
                case 3:
                    sjts2.style.display = 'none';
                    grade1.style.backgroundColor = '#016941';
                    grade2.style.backgroundColor = '#016941';
                    grade3.style.backgroundColor = '#016941';
                    break;
                default:
                    sjts2.style.display = 'block';
                    wzts3.innerText = '密码需为8-20个字符,由字母、数字或符号组成';
                    sjts2.style.width = '300px';
                    grade1.style.backgroundColor = '#f1eace';
                    grade2.style.backgroundColor = '#f1eace';
                    grade3.style.backgroundColor = '#f1eace';
                    break;
            }
        }
    })

    password1.addEventListener('blur', function() {
        if (this.value == '') {
            sjts3.style.display = 'block';
            wzts4.innerText = '请确认密码！！';
        } else {
            if (this.value == password.value) {
                sjts3.style.display = 'none';
            } else {
                sjts3.style.display = 'block';
                wzts4.innerText = '密码不一致!';
            }
        }
    })
    var btn = document.querySelector('#btn');
    btn.addEventListener('click', function() {
        if (phone.value == '' || Emails.value == '' || password1.value == '' || password == '') {
            alert('信息不为空');
        } else {
            if (gz1.test(phone.value) == true && reg2.test(Emails.value) == true && n != -1 && password.value == password1.value) {
                alert('注册成功');
            } else {
                alert('信息填写不正确，请重新填写');
            }
        }

    })



}