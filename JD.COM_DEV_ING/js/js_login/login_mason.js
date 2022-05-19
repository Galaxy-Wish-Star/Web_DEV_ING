window.onload = function () {
    var qrcode = document.querySelector('.login-tab-l');
    var zhanghu = document.querySelector('.login-tab-r');
    var saoma = document.querySelector('.qrcode-login');
    var zh = document.querySelector('.login-box');

    qrcode.addEventListener('click', function () {
        saoma.style.display = 'block';
        zh.style.display = 'none';
    })
    zhanghu.addEventListener('click', function () {
       zh.style.display = 'block';
        saoma.style.display = 'none';
    })

}