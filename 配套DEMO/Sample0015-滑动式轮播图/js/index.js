// 获取所有元素ID
var carousel = document.getElementById("carousel");
var carousel_image_container = document.getElementById("carousel_image_container");
var carousel_li_container = document.getElementById("carousel_li_container");
var carousel_controller = document.getElementById("carousel_controller");
var carousel_controller_left = document.getElementById("carousel_controller_left");
var carousel_controller_right = document.getElementById("carousel_controller_right");

// 设置全局变量
var picIndex = 0;
var picWidth = carousel.offsetWidth;

// 封装动画函数
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
	}, 0.48);
}

// 拷贝第一张图片到最后
carousel_image_container.appendChild(carousel_image_container.children[0].cloneNode(true));

// 循环遍历控制器li标签并注册单击事件和自定义属性值
for(var i = 0; i < carousel_li_container.children.length; i++) {
	// 创建自定义属性值 index
	carousel_li_container.children[i].setAttribute("index", i);

	// 注册鼠标放上去事件
	carousel_li_container.children[i].onmouseover = function() {
		// 先清除所有li标签的class
		for(var j = 0; j < carousel_li_container.children.length; j++) {
			carousel_li_container.children[j].removeAttribute("class");
		}
		// 设置当前li效果
		this.className = "active";
		// 获取鼠标进入的li的当前索引值
		picIndex = this.getAttribute("index");
		// 移动ul
		animate(carousel_image_container, -picIndex * picWidth);
	};
}

// 设置第一个图片的li为选中状态
carousel_li_container.children[0].className = "active";

function Event() {
	// 判断当前图片是否为最后一张
	if(picIndex == carousel_image_container.children.length - 1) {
		picIndex = 0;
		carousel_image_container.style.left = 0 + "px";
	}
	// 将索引切换到下一张图片
	picIndex++;
	animate(carousel_image_container, -picIndex * picWidth);
	// 添加控制器按钮样式
	if(picIndex == carousel_image_container.children.length - 1) {
		carousel_li_container.children[carousel_li_container.children.length - 1].removeAttribute("class");
		carousel_li_container.children[0].className = "active";
	} else {
		// 清除所有的小按钮的背景颜色
		for(var i = 0; i < carousel_li_container.children.length; i++) {
			carousel_li_container.children[i].removeAttribute("class");
		}
		carousel_li_container.children[picIndex].className = "active";
	}
}

// 右边按钮单机事件
carousel_controller_right.onclick = Event;

// 左边按钮单击事件
carousel_controller_left.onclick = function() {
	// 判断当前是否是第一张
	if(picIndex == 0) {
		picIndex = carousel_image_container.children.length - 1;
		carousel_image_container.style.left = (-picIndex * picWidth) + "px";
	}
	// 将索引切换到前一张图片
	picIndex--;
	animate(carousel_image_container, -picIndex * picWidth);
	// 清除所有的小按钮的背景颜色
	for(var i = 0; i < carousel_li_container.children.length; i++) {
		carousel_li_container.children[i].removeAttribute("class");
	}
	carousel_li_container.children[picIndex].className = "active";
};

// 设置自动播放
var timeId = setInterval(function() {
	Event();
}, 2000);

// 鼠标放上停止播放
carousel.onmouseover = function() {
	clearInterval(timeId);
};
// 鼠标离开开始播放
carousel.onmouseout = function() {
	timeId = setInterval(Event, 2000);
};