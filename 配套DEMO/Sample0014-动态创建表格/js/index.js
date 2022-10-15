/*获取任意标签的内容*/
function getInnerText(element) {
	// 判断浏览器是否支持textContent,如果支持，则使用textContent获取内容，否则使用innerText获取内容。
	if(typeof element.textContent == "undefined") {
		return element.innerText;
	} else {
		return element.textContent;
	}
}

/*设置任意标签的内容*/
function setInnerText(element, text) {
	// 判断浏览器是否支持textContent,如果支持，则使用textContent设置内容，否则使用innerText设置内容。
	if(typeof element.textContent == "undefined") {
		return element.innerText = text;
	} else {
		return element.textContent = text;
	}
}

// 获取行数
var table_row = document.getElementById("table_row");
// 获取列数
var table_col = document.getElementById("table_col");
// 获取按钮
var table_btn = document.getElementById("table_btn");

table_btn.onclick = function() {
	// 每次点击之前先移除已经存在的table
	if(document.getElementById("demo_result").getElementsByTagName("table")[0]) {
		document.getElementById("demo_result").removeChild(document.getElementById("demo_result").getElementsByTagName("table")[0]);
	}

	var tableObj = document.createElement("table");
	var tableCon = document.getElementById("demo_result");

	// 将创建好的表格放进容器
	tableCon.appendChild(tableObj);
	tableObj.className = "table";

	// 循环创建行和列
	for(var i = 0; i < parseInt(table_row.value); i++) {
		var row = document.createElement("tr");
		tableObj.appendChild(row);

		for(var j = 0; j < parseInt(table_col.value); j++) {
			var col = document.createElement("td");
			row.appendChild(col);
			setInnerText(col, "单元格" + (j + 1))
		}
	}
};