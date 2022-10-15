var box_ul = document.getElementById("box_ul");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var t;

box_ul.innerHTML += box_ul.innerHTML;

btn1.onclick = function() {
	clearInterval(t);
	t = setInterval("move(-20)", 30);
};

btn2.onclick = function() {
	clearInterval(t);
	t = setInterval("move(20)", 30);
};

function move(speed) {
	if(box_ul.offsetLeft < -(box_ul.offsetWidth / 2)) {
		box_ul.style.left = 0;
	}
	if(box_ul.offsetLeft > 0) {
		box_ul.style.left = -(box_ul.offsetWidth / 2) + "px";
	}
	box_ul.style.left = box_ul.offsetLeft + speed + "px";
}