// 获取对象数组
var spans = document.getElementById("box").getElementsByTagName("span");

// 设置时间函数
function setDate() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1;
	var day = nowDate.getDate();
	var hour = nowDate.getHours();
	var minute = nowDate.getMinutes();
	var second = nowDate.getSeconds();

	spans[0].innerHTML = year;
	spans[1].innerHTML = month;
	spans[2].innerHTML = day;
	spans[3].innerHTML = hour;
	spans[4].innerHTML = minute;
	spans[5].innerHTML = second;
}

// 调用设置时间
setDate();

// 加载自动刷新
window.onload = function() {
	setInterval(setDate, 1000);
};