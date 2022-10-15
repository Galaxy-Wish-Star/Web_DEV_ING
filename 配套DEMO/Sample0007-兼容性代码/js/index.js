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