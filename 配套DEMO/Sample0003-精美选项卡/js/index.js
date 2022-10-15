// 获取选项卡导航菜单所有li并返回一个li列表集合
var btn_nav_li_list = document.getElementById("tab_nav").getElementsByTagName("li");
// 获取选项卡项目内容所有li并返回一个li列表集合
var btn_item_li_list = document.getElementById("tab_item").getElementsByTagName("li");

// 初始化选项卡
for(var itemi = 0; itemi < btn_item_li_list.length; itemi++) {
	btn_item_li_list[itemi].style.display = "none";
}
// 默认第一个显示
btn_item_li_list[0].style.display = "block";

// 循环遍历选项卡导航菜单li
for(var i = 0; i < btn_nav_li_list.length; i++) {
	// 为所有li设置自定义属性index，用来检索选项卡项目
	btn_nav_li_list[i].setAttribute("index", i);

	// 为所有li注册单击事件
	btn_nav_li_list[i].onclick = function() {
		// 先清除所有选项卡导航样式
		for(var navi = 0; navi < btn_nav_li_list.length; navi++) {
			btn_nav_li_list[navi].removeAttribute("class");
		}

		// 设置单击时候样式
		this.className = "btn-active";

		// 获取当前选项卡导航li的自定义属性index
		var index = this.getAttribute("index");

		// 先隐藏所有选项卡项目
		for(var itemi = 0; itemi < btn_item_li_list.length; itemi++) {
			btn_item_li_list[itemi].style.display = "none";
		}

		// 单机选项卡导航时显示
		btn_item_li_list[index].style.display = "block";
	}
}