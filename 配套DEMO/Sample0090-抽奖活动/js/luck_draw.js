// 获取开始抽奖按钮
var 抽奖按钮 = document.getElementById("luck_btn");
// 获取幸运人员名单
var 人员名单 = document.getElementById("luck_person_list").getElementsByTagName("li");
// 获取提示信息SPAN
var 提示信息 = document.getElementById("luck_draw_content").getElementsByTagName("span");

/**
 * 功能说明:生成一个随机数
 * 
 * 参数一:最小值
 * 参数二:最大值
 * 
 * 返回值:返回一个整数
 */
function 生成随机数(min, max) {
	// 判断max和min哪一个更大
	var _max = max > min ? max : min;
	var _min = max > min ? min : max;
	return Math.floor(Math.random() * _max + _min);
}

/**
 * 功能说明:生成一个抽奖等级
 * 
 * 参数说明:无需参数
 * 
 * 返回值:返回一个抽奖等级
 */
function 生成抽奖等级() {
	var 抽奖等级数组 = ["一等奖", "二等奖", "三等奖"];
	return 抽奖等级数组[Math.floor(Math.random() * 抽奖等级数组.length + 0)];
}

/**
 * 功能说明:抽奖模块
 * 
 * 参数说明:无需参数
 * 
 * 返回值:暂无返回值
 */
function 开始抽奖() {
	// 获取随机数
	var 随机数字 = 生成随机数(1, 人员名单.length);
	// 清除人员名单列表的每一个项的样式
	for(var 索引 = 0; 索引 < 人员名单.length; 索引++) {
		人员名单[索引].className = "";
	}
	// 通过索引改变人员名单列表中的样式
	人员名单[随机数字 - 1].className = "active";
	// 更改第一个提示信息中的SPAN的值
	提示信息[0].innerHTML = 随机数字;
	// 更改第二个提示信息中的SPAN的值
	提示信息[1].innerHTML = 人员名单[随机数字 - 1].innerHTML;
	// 更改第三个提示信息中的SPAN的值
	提示信息[2].innerHTML = 生成抽奖等级();
}

// 单机开始抽奖进行抽奖
抽奖按钮.onclick = function() {
	if(this.innerHTML == "开始抽奖") {
		this.innerHTML = "停止抽奖";
		// 调用抽奖模块
		timeid = setInterval(开始抽奖, 1000);
	} else {
		this.innerHTML = "开始抽奖";
		// 清除定时函数
		clearInterval(timeid);
	}
};