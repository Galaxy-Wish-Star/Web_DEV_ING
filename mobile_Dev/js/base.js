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
// header-left返回上一页
document.addEventListener('DOMContentLoaded', function () {
	let back = document.getElementsByClassName('header-left')
	back[0].addEventListener('click', function () {
		window.history.back()
	})
})
// header-right重定向至http://127.0.0.1:8080/index.html
document.addEventListener('DOMContentLoaded', function () {
	let back = document.getElementsByClassName('header-right')
	back[0].addEventListener('click', function () {
		window.location.href = 'http://127.0.0.1:8080/index.html'
	})
})