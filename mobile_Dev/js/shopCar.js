document.addEventListener('DOMContentLoaded', function () {
	let back = document.getElementsByClassName('header-left')
	back[0].addEventListener('click', function () {
		window.history.back()
	})
})
