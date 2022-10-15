// 获取所有img壁纸并返回一个皮肤壁纸列表
var skin_img_list = document.getElementById("skin").getElementsByTagName("img");

// 循环遍历所有皮肤壁纸并注册点击事件
for(var i = 0; i < skin_img_list.length; i++) {
	// 注册点击事件
	skin_img_list[i].onclick = function() {
		// 将皮肤壁纸的src属性复制给skin_container背景
		document.getElementById("skin_container").getElementsByTagName("img")[0].src = this.src.toString().replace("small", "big");
	};
}