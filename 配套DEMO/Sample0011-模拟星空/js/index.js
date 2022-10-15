setInterval(function() {
	// 获取浏览器可见区域宽度
	var bodyWidth = document.documentElement.clientWidth;
	// 获取浏览器可见区域高度
	var bodyHeight = document.documentElement.clientHeight;

	// 随机x坐标
	var x_offset = parseInt(Math.random() * bodyWidth - 30);
	// 随机y坐标
	var y_offset = parseInt(Math.random() * bodyHeight - 30);

	// 设置星星x坐标
	document.getElementById("stars").style.left = x_offset + "px";
	// 设置星星y坐标
	document.getElementById("stars").style.top = y_offset + "px";
}, 1);