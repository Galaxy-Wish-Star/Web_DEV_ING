// 获取表格所有行并返回一个表格行列表
var table_tr_list = document.getElementById("table").getElementsByTagName("tr");
// 获取表格中的所有复选框并返回一个复选框列表
var table_checkbox_list = document.getElementById("table").getElementsByTagName("input");

// 循环遍历所有行（表头除外）
for(var i = 1; i < table_tr_list.length; i++) {
	// 为所有行注册单击事件（表头除外）
	table_tr_list[i].onclick = function() {
		// 获取每一行的第一个checkbox元素
		var nowCheckboxObj = this.getElementsByTagName("input")[0];

		// 判断当前checkbox元素是否选中，如果选中，则取消选中，如果没有选中，则选中。
		if(nowCheckboxObj.checked) {
			nowCheckboxObj.checked = false;
		} else {
			nowCheckboxObj.checked = true;
		}

		// 设置标志位，默认为true
		var flag = true;

		// 循环遍历所有复选框（表头除外）
		for(var tcl = 1; tcl < table_checkbox_list.length; tcl++) {
			if(!table_checkbox_list[tcl].checked) {
				flag = false;
				break;
			}
		}

		// 为表头行赋值为标志位
		table_checkbox_list[0].checked = flag;
	};
}

// 获取表头并实现全选和全不选
table_checkbox_list[0].onclick = function() {
	// 判断当前复选框状态
	for(var tcl = 1; tcl < table_checkbox_list.length; tcl++) {
		table_checkbox_list[tcl].checked = this.checked;
	}
};