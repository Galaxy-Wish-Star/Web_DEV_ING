var btns = document.getElementById("tab_box_head").getElementsByTagName("button");		// 获取BTN数组
var cons = document.getElementById("tab_box_content").getElementsByClassName("tbc");	// 获取DIV数组

// 默认让第一个DIV的内容显示
cons[0].style.display = "block";

// 循环给头部的按钮添加自定义属性
for(var i = 0; i < btns.length; i++) {
	btns[i].index = i;
}

// 循环给头部的按钮注册单击事件
for(var i = 0; i < btns.length; i++) {
	btns[i].onclick = function() {
		// 获取当前按钮的index
		var index = this.index;
		// 让所有DIV都不显示
		hiddenAll();
		// 让对应的DIV显示出来
		cons[index].style.display = "block";
	};
}

// 让所有DIV都不显示
function hiddenAll() {
	for(var i = 0; i < cons.length; i++) {
		cons[i].style.display = "none";
	}
}