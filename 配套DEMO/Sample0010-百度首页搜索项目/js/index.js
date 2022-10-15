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

// 数据数组
var dataArray = ["变形金刚1", "变形金刚2", "变形金刚3", "变形金刚4", "变形金刚5", "变形记", "小可爱", "大可爱"];

// 获取search_container
var search_container = document.getElementById("search_container");

// 获取search_value
var search_value = document.getElementById("search_value");

// 定义搜索引擎（百度搜索）
var url = "https://www.baidu.com/s?ie=UTF-8&wd="

search_value.onkeyup = function() {
	// 每一次按键抬起都判断当前是否存在搜索区域框，如果存在则删除
	if(document.getElementById("search_result")) {
		search_container.removeChild(document.getElementById("search_result"));
	}

	// 获取搜索框的文本
	var search_input_value = this.value;

	// 缓存数据
	var tempArray = [];

	// 循环判断输入框的值是否为数据数组中的开头关键字
	for(var i = 0; i < dataArray.length; i++) {
		if(dataArray[i].indexOf(search_input_value) == 0) {
			tempArray.push(dataArray[i]);
		}
	}

	// 如果文本框内容为空或者临时数组为空则不显示搜索结果
	if(this.value.length == 0 || tempArray.length == 0) {
		if(document.getElementById("search_result")) {
			search_container.removeChild(document.getElementById("search_result"));
		}
		// 如果符合以上两个条件则终止下面的所有代码
		return;
	}

	// 创建search_result搜索结果显示区域
	var search_result = document.createElement("div");
	search_container.appendChild(search_result);
	search_result.className = "search-result";
	search_result.id = "search_result";

	// 循环遍历临时数组，创建对应的搜索结果p标签
	for(var i = 0; i < tempArray.length; i++) {
		//创建p标签
		var pObj = document.createElement("p");
		//把p加到div中
		search_result.appendChild(pObj);
		setInnerText(pObj, tempArray[i]);
	}

	// 循环遍历所有搜索结果p标签
	var pObjs = search_result.getElementsByTagName("p");
	for(var i = 0; i < pObjs.length; i++) {
		pObjs[i].onclick = function() {
			window.location.href = url + getInnerText(this);
		};
	}
};

/*附加功能*/
document.getElementById("search_btn").onclick = function() {
	var text = document.getElementById("search_value").value;

	window.location.href = url + text;
};