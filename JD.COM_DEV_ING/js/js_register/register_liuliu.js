window.onload=function(){
    // 手机号验证
    // 1.获取元素
    var phone=document.querySelector('#phone');
    var sjts=document.querySelector('#sjts');
    var wzts1=document.querySelector('#wzts1');
    // 2.设置手机号验证规则（正则表达式） /^  $/
    var reg1=/^[1][3-9][0-9]{9}$/;
    // {9}包括0-9 且重复九次
    // 3.手机号文本框获取焦点或者失去焦点时的提示事件
    phone.addEventListener('focus',function(){
        if(this.value==''){
            sjts.style.display='block';
            wzts1.innerText='请输入手机号！';
        }else{
            sjts.style.display='none';
        }
    })
    phone.addEventListener('blur',function(){
        if(this.value==''){
            wzts1.innerText='手机号不能为空！';
        }else{
            if(reg1.test(this.value)===true){
                sjts.style.display='none';
            }else{
                sjts.style.display='block';
                wzts1.innerText='手机号格式有误！';
            }
        }
    })
    // 邮箱验证
    var email=document.querySelector('#Emails');
    var yxts=document.querySelector('#yxts');
    var wzts2=document.querySelector('#wzts2');
    var yx=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    email.addEventListener('focus',function(){
        if(this.value==''){
            yxts.style.display='block';
            wzts2.innerText='请输入邮箱号！';
        }else{
            yxts.style.display='none';
        }
    })
    email.addEventListener('blur',function(){
        if(this.value==''){
            wzts2.innerText='邮箱号不能为空！';
        }else{
            if(yx.test(this.value)===true){
                yxts.style.display='none';
            }else{
                yxts.style.display='block';
                wzts2.innerText='邮箱号格式错误！'
            }
        }
    })
    // 密码验证
    var password=document.querySelector('#password');
    var password1=document.querySelector('#password1');
    var mmts=document.querySelector('#mmts');
    var mmyz=document.querySelector('#mmyz');
    var wzts3=document.querySelector('#wzts3');
    var wzts4=document.querySelector('#wzts4');
    var grade1=document.querySelector('#grade1');
    var grade2=document.querySelector('#grade2');
    var grade3=document.querySelector('#grade3');
    // 声明变量
    var n=0;
    var linses=0;
    // 全数字8-20
    var mm2=/^\d{8,20}$/;
    // 全字母8-20
    var mm1=/^[A-Za-z]{8,20}$/;
    // 数字+字母
    var mm3=/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
    // 字母+符号
    var mm4=/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/;
    // 数字+符号
    var mm5=/^(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/;
    // 数字+字母+符号
    var mm6=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/;
    function textStrong(password){
        if(mm6.test(password.value)==true){
            n=3;
        }else{
            if(mm3.test(password.value)==true||mm4.test(password.value)==true||mm5.test(password.value)==true){
                n=2;
            }else{
                if(mm1.test(password.value)==true){
                    n=1;
                }else{
                    if(mm2.test(password.value)==true){
                        n=0;
                    }else{
                        n==-1;
                    }
                }
            }
        }
        return n;
    }
    password.addEventListener('focus',function(){
        if(this.value==''){
            mmts.style.display='block';
            wzts3.innerText='请输入密码！';
        }else{
            mmts.style.display='none';
        }
    })
    password.addEventListener('blur',function(){
        if(this.value==''){
            wzts3.innerText='密码不能为空！';
        }else{
            // if(mm.test(this.value)===true){
            //     mmts.style.display='none';
            // }else{
            //     mmts.style.display='block';
            //     wzts3.innerText='密码格式错误！';
            // }
            linses=textStrong(password);
            switch(linses){
                case 0:
                    mmts.style.display='block';
                    wzts3.innerText='密码过于简单！';
                    grade1.style.backgroundColor='red';
                    grade2.style.backgroundColor='#e1aeab';
                    grade3.style.backgroundColor='#e1aeab';
                    break;
                case 1:
                    grade1.style.backgroundColor='red';
                    grade2.style.backgroundColor='#e1aeab';
                    grade3.style.backgroundColor='#e1aeab';
                    break;
                case 2:
                    grade1.style.backgroundColor='red';
                    grade2.style.backgroundColor='red';
                    grade3.style.backgroundColor='#e1aeab';
                    break;
                case 3:
                    grade1.style.backgroundColor='red';
                    grade2.style.backgroundColor='red';
                    grade3.style.backgroundColor='red';
                    break;
                    default:
                    mmts.style.display = 'block';
                    wzts3.innerText = '密码需为8-20个字符,由字母、数字或符号组成';
                    mmts.style.width = '300px';
                    grade1.style.backgroundColor = '#e1aeab';
                    grade2.style.backgroundColor = '#e1aeab';
                    grade3.style.backgroundColor = '#e1aeab';
                    break;
            }
        }
    })
    // 再次输入密码
    password1.addEventListener('blur',function(){
        if(this.value==''){
            mmyz.style.display='block';
            wzts4.innerText='请再次确认密码！';
        }else{
            if(this.value===password.value){
                mmyz.style.display='none';
            }else{
                mmyz.style.display='block';
                wzts4.innerText='密码不一致！';
            }
        }
    })
    var btn=document.querySelector('#btn');
    btn.addEventListener('click',function(){
        if(phone.value==''||email.value==''||password.value==''||password1.value==''){
            alert('信息不能为空！');
        }else{
            if(reg1.test(phone.value)==true && yx.test(email.value)==true && n!=-1 && password.value===password1.value){
                alert('注册成功！');
            }else{
                alert('信息填写不正确，请重新填写！');
            }
        }
    })
}
