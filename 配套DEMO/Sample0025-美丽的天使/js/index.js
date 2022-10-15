document.onmousemove = function(e) {
	document.getElementById("angel").style.left = eventObject.getPageX() + "px";
	document.getElementById("angel").style.top = eventObject.getPageY() + "px";
};