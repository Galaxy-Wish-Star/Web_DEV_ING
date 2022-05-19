window.onload = function () {
    var qrcode = document.querySelector('#qrcode');
    var zhanghu = document.querySelector('#zhanghu');
    var saoma = document.querySelector('.qrcode-login');
    var zh = document.querySelector('.login-box');

    qrcode.addEventListener('click', function () {
        saoma.style.display = 'block';
        zh.style.display = 'none';
    })
    zhanghu.addEventListener('click', function () {
        zhanghu.style.display = 'block';
        saoma.style.display = 'none';
    })

}