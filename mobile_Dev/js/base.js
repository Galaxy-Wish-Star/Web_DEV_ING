// 底部导航栏点击切换，检测导航栏地址对应的地址对应不同的导航栏样式
$(function () {
	let url = window.location.href;
	let index = url.lastIndexOf("/");
	let str = url.substring(index + 1);
	// 去除.html后缀
	if (str.indexOf(".html") != -1) {
		str = str.substring(0, str.indexOf(".html"));
	}
	// 底部导航栏点击切换
	$(".footer-item")
		.eq(["index", "news", "shopCar", "user"].indexOf(str))
		.addClass("active")
		.siblings()
		.removeClass("active");
});
