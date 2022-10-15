/*动画函数*/
function animate(element, target) {
	// 先清理定时器
	clearInterval(element.timeId);
	// 一会要清理定时器(只产生一个定时器)
	element.timeId = setInterval(function() {
		// 获取对象当前的位置
		var current = element.offsetLeft;
		// 每次移动多少像素
		var step = 10;
		// 判断是往正方向走还是往相反方向走
		step = current < target ? step : -step;
		// 每次移动后的距离
		current += step;
		// 判断当前移动后的位置是否到达目标位置
		if(Math.abs(target - current) > Math.abs(step)) {
			element.style.left = current + "px";
		} else {
			// 清理定时器
			clearInterval(element.timeId);
			element.style.left = target + "px";
		}
	}, 20);
}

document.getElementById("btn1").onclick = function() {
	animate(document.getElementById("car"), 800);
};

document.getElementById("btn2").onclick = function() {
	animate(document.getElementById("car"), 1200);
};

document.getElementById("btn3").onclick = function() {
	animate(document.getElementById("car"), 0);
};