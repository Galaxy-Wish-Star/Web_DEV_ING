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
 