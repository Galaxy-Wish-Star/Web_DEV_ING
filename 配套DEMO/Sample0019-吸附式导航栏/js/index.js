window.onscroll = function() {
	// 获取元素ID
	var top = document.getElementById("top");
	var nav = document.getElementById("nav");
	var main = document.getElementById("main");
	// 判断向上卷曲的高度
	if(getScroll().top > top.offsetHeight) {
		nav.className = "fixed";
		main.style.marginTop = (nav.offsetHeight + 10) + "px";
	} else {
		nav.removeAttribute("class");
		main.style.marginTop = "0px";
	}
};