window.onload = function() {
    // 手机号验证
    //1.获取元素 =表示赋值 右边给左边
    var phone = document.querySelector('#phone');
    var sjts = document.querySelector('#sjts');
    var wzts1 = document.querySelector('#wzts1');
    // querySelector 获取
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


    //  邮箱验证
    //1.获取元素 =表示赋值 右边给左边
    var Emails = document.querySelector('#Emails');
    var yxts = document.querySelector('#yxts');
    var wzts2 = document.querySelector('#wzts2');
    // querySelector 获取
    // 2.设置邮箱验证规则-正则表达式(/^开始 $/结束)
    var gz2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    // {9}只管[0-9]
    // 3.邮箱文本框获取焦点或失去焦点时的提示事件
    Emails.addEventListener('focus', function() {
            if (this.value == '') {
                yxts.style.display = 'block';
                wzts2.innerText = '请输入邮箱号！';
            } else {
                yxts.style.display = 'none';
            }


        })
        // focus 获得焦点
    Emails.addEventListener('blur', function() {
        // sjts.style.display = 'none';
        if (this.value == '') {
            wzts2.innerText = '邮箱不能为空！';
        } else {
            if (gz2.test(this.value) === true) {
                yxts.style.display = 'none';
            } else {
                yxts.style.display = 'block';
                wzts2.innerText = '邮箱号格式错误！';
            }
        }


    })

    // 密码验证
    //1.获取元素 =表示赋值 右边给左边
    var password = document.querySelector('#password');
    var mmts = document.querySelector('#mmts');
    var mmyz = document.querySelector('#mmyz');
    var wzts3 = document.querySelector('#wzts3');
    var wzts4 = document.querySelector('#wzts4');
    // var password = document.getElementById("pw").value;
    // var repassword = document.getElementById("repw").value;
    var grade1 = document.querySelector('#grade1');
    var grade2 = document.querySelector('#grade2');
    var grade3 = document.querySelector('#grade3');
    // 声明密码强度级别n
    var n = 0;
    var passwordjb = 0;
    // 全数字
    var gz3 = /^\d{8,20}$/; //3密码强度为0
    // 全字母
    var gz4 = /^[A-z0-9~!@#$%^&*()_+`\-={}:";'<>?,./'|]{8,20}$/; //4密码强度为0
    // 字母+数字
    var gz5 = /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
    // 数字+符号
    var gz6 = /^(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./'|]).{8,20}$/; //43组合密码强度为一
    // 字母+符号
    var gz7 = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./'|]).{8,20}$/; //567组合密码强度为二
    // 数字+字母+符号(?=)正向肯定
    var gz8 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./'|]).{8,20}$/; //判断密码最高强度三
    // 3.定义返回密码n的强度级别的函数
    function textStrong(password) {
        if (gz8.test(password.value) == true) {
            n = 3;
        } else {
            if (gz7.test(password.value) == true || gz6.test(password.value) == true || gz5.test(password.value) == true) {
                n = 2;
            } else {
                if (gz4.test(password.value) == true) {
                    n = 0;
                } else {
                    if (gz3.test(password.value) == true) {
                        n = 1;
                    } else {
                        n = -1;
                    }

                }
            }
        }
        return n;
    }
    // 4.密码框获取焦点或失去焦点时的提示事件
    password.addEventListener('focus', function() {
            if (this.value == '') {
                mmts.style.display = 'block';
                wzts3.innerText = '请输入8-20的密码！';
            } else {
                mmts.style.display = 'none';
            }
        })
        // focus 获得焦点
    password.addEventListener('blur', function() {
        // sjts.style.display = 'none';
        if (this.value == '') {
            wzts3.innerText = '密码不能为空！';
            grade1.style.backgroundColor = '#f1eace';
            grade2.style.backgroundColor = '#f1eace';
            grade3.style.backgroundColor = '#f1eace';
        } else {
            passwordjb = textStrong(password);
            switch (passwordjb) {
                case 0:
                    mmts.style.display = 'block';
                    wzts3.innerText = '密码过于简单,有被盗风险！';
                    grade1.style.backgroundColor = 'red';
                    grade2.style.backgroundColor = '#elaeab';
                    grade3.style.backgroundColor = '#elaeab';
                    break;
                case 1:
                    mmts.style.display = 'none';
                    grade1.style.backgroundColor = 'red';
                    grade2.style.backgroundColor = '#elaeab';
                    grade3.style.backgroundColor = '#elaeab';

                    break;
                case 2:
                    mmts.style.display = 'none';
                    grade1.style.backgroundColor = 'red';
                    grade2.style.backgroundColor = 'red';
                    grade3.style.backgroundColor = '#elaeab';
                    break;
                case 3:
                    mmts.style.display = 'none';
                    grade1.style.backgroundColor = 'red';
                    grade2.style.backgroundColor = 'red';
                    grade3.style.backgroundColor = 'red';
                    break;

                default:
                    mmts.style.display = 'block';
                    wzts3.innerText = '密码不符合要求！';
                    grade1.style.backgroundColor = '#elaeab';
                    grade2.style.backgroundColor = '#elaeab';
                    grade3.style.backgroundColor = '#elaeab';
                    break;
            }
        }


    })


    // 再次输入密码验证
    password1.addEventListener('blur', function() {
        if (this.value == '') {
            mmyz.style.display = 'block';
            wzts4.innerText = '请再次确认密码！';
        } else {
            if (this.value === password.value) {
                mmyz.style.display = 'none';
            } else {
                mmyz.style.display = 'block';
                wzts4.innerText = '密码不一致!';
            }
        }
    })

    // 验证按钮
    var btn = document.querySelector('#btn');
    btn.addEventListener('click', function() {
        if (phone.value == '' || Emails.value == '' || password.value == '' || password1.value == '') {
            alert('信息不能为空！');
        } else {
            if (gz1.test(phone.value) == true && gz2.test(Emails.value) == true && n != -1 && password.value === password1.value) {
                alert('注册成功！');
            } else {
                alert('信息填写不正确，请重新修改')
            }
        }



    })













}