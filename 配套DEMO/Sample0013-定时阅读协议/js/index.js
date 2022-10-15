// 协议阅读时间
var time = 5;

// 定义定时器
var timeId = setInterval(function() {
	time--;

	document.getElementById("btn").value = "请仔细阅读协议（" + time + "）";

	if(time <= 0) {
		time = 0;
		document.getElementById("btn").value = "同意协议";
		document.getElementById("btn").style.backgroundColor = "orangered";
		document.getElementById("btn").style.cursor = "pointer";
		// 清理计时器
		clearInterval(timeId);
	}
}, 1000);