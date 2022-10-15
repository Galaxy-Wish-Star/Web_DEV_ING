function change() {
	// 获取当前小时
	var hours = new Date().getHours();
	// 获取当前分钟
	var minutes = new Date().getMinutes();
	// 格式化小时
	hours = hours < 10 ? "0" + hours : hours;
	// 格式化分钟
	minutes = minutes < 10 ? "0" + minutes : minutes;
	// 设置图片地址
	document.getElementById("times").getElementsByTagName("img")[0].src = "img/" + hours + "_" + minutes + ".jpg";
}

change();

// 设置定时器，一秒钟执行一次
setInterval(change, 1000);