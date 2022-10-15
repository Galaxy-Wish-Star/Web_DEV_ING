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