$(function () {
	// 底部导航栏
	$(".footer-item").on("click", function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
});
