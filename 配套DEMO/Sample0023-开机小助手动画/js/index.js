// 获取box的ID
var box = document.getElementById("box");

// 设置进入动画
setTimeout(function() {
	animation(box, {
		"width": 369
	})
}, 1500);

// 设置移出动画
setTimeout(function() {
	animation(box, {
		"width": 45
	})
}, 6000);