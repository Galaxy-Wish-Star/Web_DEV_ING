window.onload = function() {
    // 获取对应元素
    var smdl = document.querySelector('#smdl');
    var zhdl = document.querySelector('#zhdl');
    var sm = document.querySelector('.qrcode-login ');
    var zh = document.querySelector('.login-box');
    var mc = document.querySelector('.mc');
    smdl.addEventListener('click', function() {
        sm.style.display = 'block';
        zh.style.diasplay = 'none';
        mc.style.display = 'none';
        smdl.style.color = 'red';
        zhdl.style.color = '#666';
    })

    zhdl.addEventListener('click', function() {
        sm.style.display = 'none';
        zh.style.diasplay = 'block';
        mc.style.display = 'block';
        zhdl.style.color = 'red';
        smdl.style.color = '#666';
    })

}