//先获取所有的li标签
var picList = document.getElementById("box").getElementsByTagName("li");

for(var i = 0; i < picList.length; i++) {
	// 鼠标进入
	picList[i].onmouseover = mouseoverHandle;
	// 鼠标离开
	picList[i].onmouseout = mouseoutHandle;
}

// 鼠标进入事件
function mouseoverHandle() {
	for(var j = 0; j < picList.length; j++) {
		animation(picList[j], {
			"width": 50
		});
	}
	animation(this, {
		"width": 1026
	});
}

// 鼠标离开事件
function mouseoutHandle() {
	for(var j = 0; j < picList.length; j++) {
		animation(picList[j], {
			"width": 245.2
		});
	}
}