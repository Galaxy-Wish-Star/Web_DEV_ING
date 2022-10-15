// 获取所有元素ID
var carousel = document.getElementById("carousel");
var carousel_image_container = document.getElementById("carousel_image_container");
var carousel_li_container = document.getElementById("carousel_li_container");
var carousel_controller = document.getElementById("carousel_controller");
var carousel_controller_left = document.getElementById("carousel_controller_left");
var carousel_controller_right = document.getElementById("carousel_controller_right");

// 设置全局变量
var picIndex = 0;

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
		// 设置所有图片隐藏
		for(var j = 0; j < carousel_image_container.children.length; j++) {
			carousel_image_container.children[j].style.display = "none";
		}
		// 显示当前图片
		carousel_image_container.children[picIndex].style.display = "block";
	};
}

// 设置第一个图片的li为选中状态
carousel_li_container.children[0].className = "active";
// 设置第一个图片为选中状态
carousel_image_container.children[0].style.display = "block";

function Event() {
	// 索引值指向下一个
	picIndex++;
	// 判断是否是最后一张图片
	if(picIndex == carousel_image_container.children.length) {
		picIndex = 0;
	}
	// 设置所有图片隐藏
	for(var j = 0; j < carousel_image_container.children.length; j++) {
		carousel_image_container.children[j].style.display = "none";
	}
	// 显示当前图片
	carousel_image_container.children[picIndex].style.display = "block";
	// 添加控制器按钮样式
	if(picIndex == carousel_image_container.children.length) {
		carousel_li_container.children[carousel_li_container.children.length].removeAttribute("class");
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
	// 索引值指向前一个
	picIndex--;
	// 判断当前是否是第一张
	if(picIndex == -1) {
		picIndex = carousel_image_container.children.length - 1;
	}
	// 设置所有图片隐藏
	for(var j = 0; j < carousel_image_container.children.length; j++) {
		carousel_image_container.children[j].style.display = "none";
	}
	// 显示当前图片
	carousel_image_container.children[picIndex].style.display = "block";
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