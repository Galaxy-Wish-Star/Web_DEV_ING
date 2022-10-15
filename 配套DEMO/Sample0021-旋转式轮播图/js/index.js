// 获取轮播图ID
var carousel = document.getElementById("carousel");
// 控制条
var control = document.getElementById("control");
// 下一张
var next = document.getElementById("next");
// 上一张
var prev = document.getElementById("prev");
// 图片列表
var picList = carousel.getElementsByTagName("li");

var config = [{
		width: 400,
		height: 250,
		top: 0,
		left: 100,
		opacity: 0.59,
		zIndex: 10
	},
	{
		width: 540,
		height: 337.5,
		top: 50,
		left: 0,
		opacity: 0.79,
		zIndex: 100
	},
	{
		width: 600,
		height: 375,
		top: 100,
		left: 212.5,
		opacity: 0.99,
		zIndex: 1000
	},
	{
		width: 540,
		height: 337.5,
		top: 50,
		left: 540,
		opacity: 0.79,
		zIndex: 100
	},
	{
		width: 400,
		height: 250,
		top: 0,
		left: 580,
		opacity: 0.59,
		zIndex: 10
	}
];

// 设置标记位
var flag = false;

// 循环加载图片
function assign() {
	for(var i = 0; i < picList.length; i++) {
		// 加载动画
		animation(picList[i], config[i], function() {
			flag = true;
		});
	}
}

assign();

// 当鼠标放到轮播图上时，显示控制条
carousel.onmouseover = function() {
	control.style.display = "block";
};

// 当鼠标移出轮播图上时，隐藏控制条
carousel.onmouseout = function() {
	control.style.display = "none";
};

// 右边按钮点击事件
next.onclick = function() {
	if(flag) {
		flag = false;
		config.push(config.shift());
		assign();
	}
};

// 左边按钮点击事件
prev.onclick = function() {
	if(flag) {
		flag = false;
		config.unshift(config.pop());
		assign();
	}
};