/*获取所有元素的ID*/
var calc_header = document.getElementById("calc_header");
var calc_control = document.getElementById("calc_control");
var calc_result = document.getElementById("calc_result");

/*获取计算数字和计算符号*/
for(var i = 0; i < calc_control.children.length; i++) {
	/*为所有的子元素注册点击事件*/
	calc_control.children[i].onclick = function() {
		var tmp = calc_header.textContent;
		calc_header.innerText = tmp + this.textContent;
	};
}

/*计算结果*/
calc_result.onclick = function() {
	calc_header.innerText = eval(calc_header.textContent);
};