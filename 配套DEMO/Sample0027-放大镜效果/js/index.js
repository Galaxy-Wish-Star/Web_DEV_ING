// 获取所有元素ID
var box = document.getElementById("box");
var small = document.getElementById("small");
var big = document.getElementById("big");
var mask = document.getElementById("mask");
var smallImg = document.getElementById("small").getElementsByTagName("img")[0];
var bigImg = document.getElementById("big").getElementsByTagName("img")[0];
var box_bot_list = document.getElementById("box_bot").getElementsByTagName("img");
var box_container = document.getElementById("box_container");

// 当鼠标放到box上面时候，显示mask遮罩层和大图
box.onmouseover = function() {
	mask.style.display = "block";
	big.style.display = "block";
};

// 当鼠标移出box上面时候，隐藏mask遮罩层和大图
box.onmouseout = function() {
	mask.style.display = "none";
	big.style.display = "none";
};

// 当鼠标在小层上面移动的时候
small.onmousemove = function() {
	// 设置鼠标在遮挡层中间显示
	var x = eventObject.getClientX() - mask.offsetWidth / 2;
	var y = eventObject.getClientY() - mask.offsetHeight / 2;
	// 去除外层margin对内层鼠标定位影响
	x -= box_container.offsetLeft;
	y -= box_container.offsetTop;
	// 横坐标的最小值
	x = x < 0 ? 0 : x;
	// 纵坐标的最小值
	y = y < 0 ? 0 : y;
	// 横坐标的最大值
	x = x > small.offsetWidth - mask.offsetWidth ? small.offsetWidth - mask.offsetWidth : x;
	// 纵坐标的最大值
	y = y > small.offsetHeight - mask.offsetHeight ? small.offsetHeight - mask.offsetHeight : y;
	// 为遮挡层的left和top赋值
	mask.style.left = x + "px";
	mask.style.top = y + "px";
	// 大图的横向的最大移动距离
	var maxX = bigImg.offsetWidth - big.offsetWidth;
	// 小图的横向的最大移动距离
	var minxX = small.offsetWidth - mask.offsetWidth;
	// 大图的横向移动的坐标
	var bigImgMoveX = x * maxX / minxX;
	// 大图的纵向移动的坐标
	var bigImgMoveY = y * maxX / minxX;
	// 设置大图片移动的坐标
	bigImg.style.marginLeft = -bigImgMoveX + "px";
	bigImg.style.marginTop = -bigImgMoveY + "px";
};

// 循环遍历注册点击事件
for(var i = 0; i < box_bot_list.length; i++) {
	box_bot_list[i].onclick = function() {
		smallImg.src = this.src;
		smallImg.alt = this.alt;
		bigImg.src = this.src;
		bigImg.alt = this.alt;
	};
}