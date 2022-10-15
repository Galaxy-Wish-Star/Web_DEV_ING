document.getElementById("password").onkeyup = function() {
	document.getElementById("level").className = "level_" + (this.value.length >= 6 ? getLevel(this.value) : 0);
};

function getLevel(value) {
	var level = 0;
	if(/[0-9]/.test(value)) {
		level++;
	}
	if(/[a-zA-z]/.test(value)) {
		level++;
	}
	if(/[^0-9a-zA-Z_]/.test(value)) {
		level++;
	}
	return level;
}