/*匀速动画*/
function animate(element, target) {
	clearInterval(element.timeId);
	element.timeId = setInterval(function() {
		var current = element.offsetLeft;
		var step = (target - current) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		current += step;
		element.style.left = current + "px";
		if(current == target) {
			clearInterval(element.timeId);
		}
	}, 20);
}
// 获取云彩容器
var cloud = document.getElementById("cloud");
// 获取所有的li标签
var list = document.getElementById("navBar").children;
// 记录最后一次的位置，默认刚开始的位置为左边45px
var lastPosition = 45;
// 循环遍历分别注册鼠标进入,鼠标离开,点击事件
for(var i = 0; i < list.length; i++) {
	// 鼠标进入事件
	list[i].onmouseover = mouseoverHandle;
	// 鼠标点击事件
	list[i].onclick = clickHandle;
	// 鼠标离开事件
	list[i].onmouseout = mouseoutHandle;
}
// 鼠标进入事件
function mouseoverHandle() {
	animate(cloud, this.offsetLeft);
}
// 鼠标点击事件
function clickHandle() {
	lastPosition = this.offsetLeft;
}
// 鼠标离开事件
function mouseoutHandle() {
	animate(cloud, lastPosition);
}