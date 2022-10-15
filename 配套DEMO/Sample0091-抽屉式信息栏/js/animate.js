/**
 * 功能说明：动画函数
 * @param {Object} obj		施加动画效果的对象
 * @param {Object} json		施加动画效果的参数
 * @param {Object} interval	循环执行的速率
 * @param {Object} sp		动画变化的速率
 * @param {Object} fn		回调函数
 */
function animate(obj, json, interval, sp, fn) {
	clearInterval(obj.timer);

	function getStyle(obj, arr) {
		if(obj.currentStyle) {
			return obj.currentStyle[arr];
		} else {
			return document.defaultView.getComputedStyle(obj, null)[arr];
		}
	}

	obj.timer = setInterval(function() {
		var flag = true;

		for(var arr in json) {
			var current = 0;
			if(arr == "opacity") {
				current = Math.round(parseFloat(getStyle(obj, arr)) * 100);
			} else {
				current = parseInt(getStyle(obj, arr));
			}
			var speed = (json[arr] - current) * sp;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(current != json[arr]) {
				flag = false;
			}
			if(arr == "opacity") {
				obj.style.filter = "alpha(opacity : '+(current + speed)+' )";
				obj.style.opacity = (current + speed) / 100;
			} else {
				obj.style[arr] = current + speed + "px";
			}
		}

		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, interval);
}