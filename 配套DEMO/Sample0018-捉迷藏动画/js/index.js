// 封装渐出动画
function fadeOut(element) {
	// 设置默认透明度
	var opacity = 10;
	// 设置定时器
	var timeId = setInterval(function() {
		// 依次递减
		opacity--;
		// 判断是否完全透明
		if(opacity <= 0) {
			clearInterval(timeId); //清理定时器
			opacity = 0;
		}
		// 设置元素透明度
		element.style.opacity = opacity / 10;
	}, 50);
}

// 封装渐入动画
function fadeIn(element) {
	// 设置默认透明度
	var opacity = 0;
	// 设置定时器
	var timeId = setInterval(function() {
		// 依次递增
		opacity++;
		// 判断是否完进入完毕
		if(opacity >= 10) {
			clearInterval(timeId); //清理定时器
			opacity = 10;
		}
		// 设置元素透明度
		element.style.opacity = opacity / 10;
	}, 50);
}

document.getElementById("btn1").onclick = function() {
	fadeIn(document.getElementById("car"));
};

document.getElementById("btn2").onclick = function() {
	fadeOut(document.getElementById("car"));
};