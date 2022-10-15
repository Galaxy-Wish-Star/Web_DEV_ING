// 获取所有元素的ID
var dialog = document.getElementById("dialog");
var dialog_title = document.getElementById("dialog_title");
var dialog_mask = document.getElementById("dialog_mask");
var dialog_close = document.getElementById("dialog_close");

// 测试按钮单击事件
document.getElementById("btn").onclick = function() {
	dialog_mask.style.display = "block";
	dialog.style.display = "block";
	animation(dialog, {
		"height": 400
	});
};

// 对话框关闭事件
dialog_close.onclick = function() {
	dialog_mask.style.display = "none";
	dialog.style.display = "none";
};

// 当鼠标点击了遮罩层则隐藏对话框和遮罩层
dialog_mask.onmouseup = function() {
	dialog_mask.style.display = "none";
	dialog.style.display = "none";
};

// 对话框移动事件
dialog_title.onmousedown = function() {
	// 获取此时的可视区域的横坐标-此时登录框距离左侧页面的横坐标
	var spaceX = eventObject.getClientX() - dialog.offsetLeft;
	var spaceY = eventObject.getClientY() - dialog.offsetTop;

	// 移动的事件
	document.onmousemove = function(e) {
		// 新的可视区域的横坐标-spaceX就是dialog的横坐标
		// 新的可视区域的纵坐标-spaceY就是dialog的纵坐标
		var x = eventObject.getClientX() - spaceX + 200;
		var y = eventObject.getClientY() - spaceY + 300;

		// 最小值判断
		x = x - 200 < 0 ? 200 : x;
		y = y - 300 < 0 ? 300 : y;

		// 最大值判断
		x = x > dialog_mask.offsetWidth - dialog.offsetWidth + 200 ? dialog_mask.offsetWidth - dialog.offsetWidth + 200 : x;
		y = y > dialog_mask.offsetHeight - dialog.offsetHeight + 300 ? dialog_mask.offsetHeight - dialog.offsetHeight + 300 : y;

		// 设置鼠标移动的时候，文字不被选中
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

		// 将计算后的数值重新赋值给dialog
		dialog.style.left = x + "px";
		dialog.style.top = y + "px";
	};
};

// 对话框取消移动事件
document.onmouseup = function() {
	document.onmousemove = null;
};