/*获取轮播图的容器*/
var carousel = document.getElementById("carousel");
/*获取轮播图的图片*/
var img = document.getElementById("carousel-display-img");
/*获取导航条的按钮*/
var nav = document.getElementById("carousel-nav").getElementsByTagName("li");
/*获取轮播控制条*/
var controller = document.getElementById("carousel-controller");
/*获取左边的按钮*/
var prev = document.getElementById("carousel-controller-left");
/*获取右边的按钮*/
var next = document.getElementById("carousel-controller-right");

/*定义全局的变量*/
var index = 0;

/*初始化图片数组*/
var arr = new Array();
for(var i = 0; i < 5; i++) {
	arr[i] = "img\\" + (i) + ".jpg ";
}

/*初始化所有导航li*/
for(var i = 0; i < 5; i++) {
	nav[i].title = i;
}

/*清空所有导航样式*/
function clearNav() {
	for(var i = 0; i < 5; i++) {
		nav[i].className = "";
	}
}

/*设置导航条单击事件*/
for(var i = 0; i < 5; i++) {
	nav[i].onclick = function() {
		/*获取导航索引*/
		var v = this.title;
		/*设置当前图片*/
		img.src = arr[v];
		/*全部清除li样式*/
		clearNav();
		/*设置当前样式*/
		nav[v].className = "active";
		/*更改当前索引*/
		index = v;
	};
}

/*点击左侧的按钮事件*/
function doPrev() {
	/*索引累加*/
	index--;
	/*判断是否越界*/
	if(index == -1) {
		index = 4;
	}
	img.src = arr[index];
	/*全部清除li样式*/
	clearNav();
	/*设置当前样式*/
	nav[index].className = "active";
};
prev.onclick = doPrev;

/*点击右侧的按钮事件*/
function doNext() {
	/*索引累加*/
	index++;
	/*判断是否越界*/
	if(index == 5) {
		index = 0;
	}
	img.src = arr[index];
	/*全部清除li样式*/
	clearNav();
	/*设置当前样式*/
	nav[index].className = "active";
};
next.onclick = doNext;

// 设置自动播放
var timeId = setInterval(doNext, 2000);

// 鼠标放上停止播放
carousel.onmouseover = function() {
	clearInterval(timeId);
	/*导航控制条显示*/
	controller.style.display = "block";
};
// 鼠标离开开始播放
carousel.onmouseout = function() {
	timeId = setInterval(doNext, 2000);
	/*导航控制条显示*/
	controller.style.display = "none";
};