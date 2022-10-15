// 获取全部元素ID
var box = document.getElementById("box");
var box_content = document.getElementById("box_content");
var box_scroll = document.getElementById("box_scroll");
var box_scroll_bar = document.getElementById("box_scroll_bar");

// 动态计算滚动条的高度
box_scroll_bar.style.height = box.offsetHeight * box_scroll.offsetHeight / box_content.offsetHeight + "px";

// 给滚动条滑块注册移动事件
box_scroll_bar.onmousedown = function() {
	// 空白区域Y坐标
	var spaceY = eventObject.getClientY() - box_scroll_bar.offsetTop;
	// 移动事件
	document.onmousemove = function() {
		var y = eventObject.getClientY() - spaceY;
		// 判断最小值
		y = y < 0 ? 0 : y;
		y = y > box_scroll.offsetHeight - box_scroll_bar.offsetHeight ? box_scroll.offsetHeight - box_scroll_bar.offsetHeight : y;
		box_scroll_bar.style.top = y + "px";

		// 清除选中文字功能
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

		// 设置文字区域移动
		var moveY = y * (box_content.offsetHeight - box.offsetHeight) / (box_scroll.offsetHeight - box_scroll_bar.offsetHeight);
		//设置文字div的移动距离
		box_content.style.marginTop = -moveY + "px";

	};
};

// 当鼠标抬起时，清除滑块滚动的事件
document.onmouseup = function() {
	document.onmousemove = null;
};