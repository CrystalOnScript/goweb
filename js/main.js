(function() {
	var icon = document.getElementById('nav-icon');
	var nav = document.getElementsByTagName('nav')[0];
	icon.onclick = function(){
		this.classList.toggle('open');
		nav.classList.toggle('open');
	};
	nav.onclick = function() {
		if(this.classList.contains('open')) {
			this.classList.remove('open');
			icon.classList.remove('open');
		}
	};
})();