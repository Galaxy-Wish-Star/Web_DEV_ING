// 获取所有li标签并注册鼠标进入事件
var liList = document.getElementById("nav").getElementsByTagName("li");
// 获取效果背景ID
var active = document.getElementById("active");

for(var i = 0; i < liList.length; i++) {
	liList[i].onmouseover = function() {
		// 获取当前li的长和宽和左边距离
		var width = parseInt(getElementStyleValue(this, "width"));
		var left = this.offsetLeft;
		// 开始动画
		animation(active, {
			"left": left,
			"width": width
		});
		// 测试代码
		console.log("li宽：" + width + "，li左边距离：" + left);
	};
	liList[i].onmouseout = function() {
		// 开始动画
		animation(active, {
			"left": 0,
			"width": 56
		});
		// 测试代码
		console.log("li宽：" + width + "，li左边距离：" + left);
	};
}