window.onload = function () {
  var qrcode = document.querySelector(".login-tab-l");
  var zhanghu = document.querySelector(".login-tab-r");
  var saoma = document.querySelector(".qrcode-login");
  var zh = document.querySelector(".login-box");
  var hoer = document.querySelector("#phone-org");
  var phoneorg = document.querySelector("#qrcodelog");
  var smdl = document.querySelector("#smdl");
  var zhdl = document.querySelector("#zhdl");

  qrcode.addEventListener("click", function () {
    saoma.style.display = "block";
    zh.style.display = "none";
    smdl.style.color = "#E4393C";
    smdl.style.fontWeight = "bold";
    zhdl.style.fontWeight = "normal";
    zhdl.style.color = "#746666";
  });
  zhanghu.addEventListener("click", function () {
    zh.style.display = "block";
    saoma.style.display = "none";
    zhdl.style.color = "#E4393C";
    zhdl.style.fontWeight = "bold";
    smdl.style.fontWeight = "normal";
    smdl.style.color = "#746666";
  });
  phoneorg.addEventListener("mouseenter", function () {
    hoer.style.display = "block";
  });
  phoneorg.addEventListener("mouseleave", function () {
    hoer.style.display = "none";
  });

  var pwd = document.querySelector("#nloginpwd");
  var zhangh = document.querySelector("#loginname");
  var gz1 = /^\d{8,20}$/;
  var btn = document.querySelector("#loginsubmit");
  btn.addEventListener("click", function () {
    if (zhangh.value === "" || pwd.value === "") {
      alert("请填写账号密码！");
    } else {
      if (gz1.test(zhangh.value) === false || gz1.test(pwd.value) == false) {
        alert("账号密码格式错误");
      } else {
        if (loginname.value == "11111111" && pwd.value == "11111111") {
          alert("登陆成功！");
          window.location.href = "index_mason.html";
        } else {
          alert("账号密码错误!");
        }
      }
    }
  });
};
