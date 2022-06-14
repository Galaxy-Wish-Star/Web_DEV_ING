window.onload=function(){
    var smdl=document.querySelector('.login-tab-l');
    var zhdl=document.querySelector('.login-tab-r');
    var sm=document.querySelector('.qrcode-login');
    var zh=document.querySelector('.login-box');
    var pt1=document.querySelector('#pt1');
    var pt2=document.querySelector('#pt2');
    var loginbtn=document.querySelector('.login-btn');
    var loginname=document.querySelector('#loginname');
    var smdl1=document.querySelector('#smdl1');
    var zhdl1=document.querySelector('#zhdl1');
    var mm1=/^\d{8,20}$/;
    var mm2=/^[A-Za-z]{8,20}$/;
    smdl.addEventListener('click',function(){
        sm.style.display='block';
        zh.style.display='none';
        smdl1.style.color='red';
        smdl1.style.fontWeight='bold';
        zhdl1.style.color='#746666';
        zhdl1.style.fontWeight='normal';
    })
    zhdl.addEventListener('click',function(){
        zh.style.display='block';
        sm.style.display='none';
        zhdl1.style.color='red';
        zhdl1.style.fontWeight='bold';
        smdl1.style.color='#746666';
        smdl1.style.fontWeight='normal';
    })
    pt1.addEventListener('mouseenter',function(){
        pt2.style.display='block';
    })
    pt1.addEventListener('mouseleave',function(){
        pt2.style.display='none';
    })
    loginbtn.addEventListener('click',function(){
        if(loginname.value==''||loginpwd.value==''){
            alert('账号或者密码不能为空!');
        }else{
            if(mm1.test(loginname.value)==false||mm2.test(loginpwd.value)==false){
                alert('账号或者密码格式错误!');
            }else{
                if(loginname.value=='15688889999'&&loginpwd.value=='liuliuliu'){
                    alert('登录成功!');
                    window.location.href='../JD.COM_DEV_ING/index_liuliu.html'
                }else{
                    alert('账号或者密码错误!');
                }
            }
        }
    })
}