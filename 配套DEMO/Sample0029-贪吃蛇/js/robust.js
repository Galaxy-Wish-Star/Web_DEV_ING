// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if(!Array.prototype.forEach) {

	Array.prototype.forEach = function(callback /*, thisArg*/ ) {

		var T, k;

		if(this == null) {
			throw new TypeError('this is null or not defined');
		}

		// 1. Let O be the result of calling toObject() passing the
		// |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get() internal
		// method of O with the argument "length".
		// 3. Let len be toUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If isCallable(callback) is false, throw a TypeError exception. 
		// See: http://es5.github.com/#x9.11
		if(typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let
		// T be undefined.
		if(arguments.length > 1) {
			T = arguments[1];
		}

		// 6. Let k be 0.
		k = 0;

		// 7. Repeat while k < len.
		while(k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//    This is implicit for LHS operands of the in operator.
			// b. Let kPresent be the result of calling the HasProperty
			//    internal method of O with argument Pk.
			//    This step can be combined with c.
			// c. If kPresent is true, then
			if(k in O) {

				// i. Let kValue be the result of calling the Get internal
				// method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as
				// the this value and argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined.
	};
}

/*获取任意元素样式值*/
function getElementStyleValue(element, attr) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(element, null)[attr];
	} else {
		return element.currentStyle[attr];
	}
}

/*设置透明度值*/
function setOpacityValue(element, value) {
	// 判断透明度值是否超过范围
	value = value < 0 ? 0 : value;
	value = value > 1 ? 1 : value;
	// 判断浏览器是否支持opacity
	if(document.all) {
		// 设置IE浏览器透明度值
		element.style.filter = "alpha(opacity=" + (value * 100) + ")";
	} else {
		// 设置非IE浏览器透明度
		element.style.opacity = value;
	}
}

/*获取页面向上或者向左卷曲出去的距离的值*/
function getScroll() {
	return {
		left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
		top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	};
}

/*获取任意标签的内容*/
function getInnerText(element) {
	if(typeof element.textContent == "undefined") {
		return element.innerText;
	} else {
		return element.textContent;
	}
}

/*设置任意标签的内容*/
function setInnerText(element, text) {
	if(typeof element.textContent == "undefined") {
		return element.innerText = text;
	} else {
		return element.textContent = text;
	}
}

/*为任意元素绑定事件*/
function addEventListener(element, type, fn) {
	if(element.addEventListener) {
		element.addEventListener(type, fn, false);
	} else if(element.attachEvent) {
		element.attachEvent("on" + type, fn);
	} else {
		element["on" + type] = fn;
	}
}

/*为任意元素解绑事件*/
function removeEventListener(element, type, fnName) {
	if(element.removeEventListener) {
		element.removeEventListener(type, fnName, false);
	} else if(element.detachEvent) {
		element.detachEvent("on" + type, fnName);
	} else {
		element["on" + type] = null;
	}
}

/*获取任意一个父级元素的第一个子元素*/
function getfirstElementChild(element) {
	if(element.firstElementChild) {
		return element.firstElementChild;
	} else {
		var node = element.firstChild;
		while(node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}

/*获取任意一个父级元素的最后一个子元素*/
function getLastElementChild(element) {
	if(element.lastElementChild) {
		return element.lastElementChild;
	} else {
		var node = element.lastChild;
		while(node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}

/*获取任意一个子元素的前一个兄弟元素*/
function getPreviousElementSibling(element) {
	if(element.previousElementSibling) {
		return element.previousElementSibling;
	} else {
		var node = element.previousSibling;
		while(node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}

/*获取任意一个子元素的后一个兄弟元素*/
function getNextElementSibling(element) {
	if(element.nextElementSibling) {
		return element.nextElementSibling;
	} else {
		var node = element.nextSibling;
		while(node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}

/*变速动画函数*/
function animation(element, json, fn) {
	// 清理定时器
	clearInterval(element.timeId);
	// 设置定时器
	element.timeId = setInterval(function() {
		// 标记位，默认所有动作都已完成
		var flag = true;
		// 循环遍历所有属性值
		for(var attr in json) {
			// 判断是否是透明度属性
			if(attr == "opacity") {
				// 获取当前元素的当前透明度值并且扩大100倍
				var current = getElementStyleValue(element, attr) * 100;
				// 设置终点透明度值并且扩大100倍
				var target = json[attr] * 100;
				// 设置基本步长值
				var step = (target - current) / 10;
				// 确定移动的步数
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				// 移动后的步数值
				current += step;
				// 缩小100倍并设置移动后元素的透明度值
				element.style[attr] = (current / 100);
				// 判断是否是层级属性
			} else if(attr == "zIndex") {
				// 直接设置元素的层级
				element.style[attr] = json[attr];
				// 普通属性
			} else {
				// 获取当前元素的当前属性值
				var current = parseInt(getElementStyleValue(element, attr));
				// 设置终点目标值
				var target = json[attr];
				// 设置基本步长值
				var step = (target - current) / 10;
				// 确定移动的步数
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				// 移动后的步数值
				current += step;
				// 设置移动后元素属性值
				element.style[attr] = current + "px";
			}
			// 判断是否到达目标
			if(current != target) {
				flag = false;
			}
		}
		// 如果全部动作都已完成，则清理定时器
		if(flag) {
			clearInterval(element.timeId);
			// 当动画完成，判断用户是否传入了回调函数
			if(fn) {
				fn();
			}
		}
		// 测试代码
		console.log("目标:" + target + "，当前:" + current + "，每次移动步数:" + step);
	}, 20);
}

/*获取当前元素坐标位置*/
var eventObject = {
	// window.event和事件参数对象e的兼容
	getEvent: function(e) {
		return window.event || e;
	},
	// 可视区域的横坐标的兼容代码
	getClientX: function(e) {
		return this.getEvent(e).clientX;
	},
	// 可视区域的纵坐标的兼容代码
	getClientY: function(e) {
		return this.getEvent(e).clientY;
	},
	// 页面向左卷曲出去的横坐标
	getScrollLeft: function() {
		return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
	},
	// 页面向上卷曲出去的纵坐标
	getScrollTop: function() {
		return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
	},
	// 相对于页面的横坐标（pageX或者是clientX+scrollLeft）
	getPageX: function(e) {
		return this.getEvent(e).pageX ? this.getEvent(e).pageX : this.getClientX(e) + this.getScrollLeft();
	},
	// 相对于页面的纵坐标（pageY或者是clientY+scrollTop）
	getPageY: function(e) {
		return this.getEvent(e).pageY ? this.getEvent(e).pageY : this.getClientY(e) + this.getScrollTop();
	}
};