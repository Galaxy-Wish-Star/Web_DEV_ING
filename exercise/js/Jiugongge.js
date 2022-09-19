// 要操作的元素
const lis = document.querySelectorAll(".container li");
ps = document.querySelectorAll(".container li p");

// 获取移入、移出的方向

function direct(e, o) {
	let w = o.offsetWidth,
		h = o.offsetHeight,
		top = o.offsetTop,
		left = o.offsetLeft,
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
		scrollLeft =
			document.body.scrollLeft || document.documentElement.scrollLeft,
		offTop = top - scrollTop,
		offleft = left - scrollLeft,
		ex = e.pageX - scrollLeft || e.clientX,
		ey = e.pageY - scrollTop || e.clientY,
		x = (ex - offleft - w / 2) * (w > h ? h / w : 1),
		y = (ey - offTop - h / 2) * (h > w ? w / h : 1),
		angle = (Math.round((y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4,
		directName = ["上", "右", "下", "左"];
	return directName[angle];
}

// 鼠标事件 (方向，元素，鼠标进入或离开)
function mouseEvent(angle, o, d) {
	var w = o.offsetWidth,
		h = o.offsetHeight;
	var p = o.querySelector("p"); //元素下的p元素
	p.style.transition = "0s";
	if (d == "in") {
		//鼠标进入
		//判断方向
		switch (angle) {
			case "上":
				if (p.offsetTop == 0 && p.offsetTop == 0) break;
				p.style.left = 0;
				p.style.top = -h + "px";
				setTimeout(() => {
					p.style.left = 0;
					p.style.top = 0;
					p.style.transition = "0.2s";
				}, 50);
				break;
			case "右":
				if (p.offleft == 0 && p.offTop == 0) break;
				p.style.left = w + "px";
				p.style.top = 0;
				setTimeout(() => {
					p.style.left = 0;
					p.style.top = 0;
					p.style.transition = "0.2s";
				}, 50);
				break;
			case "下":
				if (p.offleft == 0 && p.offTop == 0) break;
				p.style.left = 0;
				p.style.top = h + "px";
				setTimeout(() => {
					p.style.left = 0;
					p.style.top = 0;
					p.style.transition = "0.2s";
				}, 50);
				break;
			case "左":
				if (p.offleft == 0 && p.offTop == 0) break;
				p.style.left = w + "px";
				p.style.top = 0;
				setTimeout(() => {
					p.style.left = 0;
					p.style.top = 0;
					p.style.transition = ".2s";
				}, 50);
				break;
		}
	}
}
