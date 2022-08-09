 window.onload = function() {
     var smdl = document.querySelector(".login-tab-l");
     var zhdl = document.querySelector(".login-tab-r");
     var mc = document.querySelector(".qrcode-login .mc");
     var zh = document.querySelector(".login-box");
     var banner = document.querySelector(".banner");
     var banimgs = banner.querySelectorAll("img");
     var index = 0;
     console.log(banimgs);
     smdl.addEventListener('click', function() {
         mc.style.display = 'block';
         zh.style.display = 'none';
     })
     zhdl.addEventListener('click', function() {
         mc.style.display = 'none';
         zh.style.display = 'block';
     })
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
 }

 // $(function() {
 //     $(".login-tab-l").click(function() {
 //         $(".qrcode-login .mc").show().parent().siblings(".login-box").hide();
 //     })
 //     $(".login-tab-r").click(function() {
 //         $(".login-box").show().siblings(".qrcode-login").children(".mc").hide();
 //     })
 // })