(function() {
	document.getElementById('nav-icon').onclick = function(){
		this.classList.toggle('open');
		document.getElementsByTagName('nav')[0].classList.toggle('open');
	};
})();