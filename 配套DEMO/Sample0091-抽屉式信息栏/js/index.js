var share = document.getElementById("share");

share.onmouseover = function() {
	animate(this, { top: 0 }, 10, 0.01);
}

share.onmouseout = function() {
	animate(this, { top: -350 }, 10, 0.01);
}