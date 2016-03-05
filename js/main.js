(function() {

	// main navigation
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

	// scroll snapping showcase (for supported browsers)
	var isScrollSnapSupported = 'scrollSnapType' in document.documentElement.style ||
	        'webkitScrollSnapType' in document.documentElement.style;

	if (isScrollSnapSupported) {
		initScrollSnapping();	    
	}

	function initScrollSnapping() {

		var teaser = document.querySelector('.teaser .wrapper');
		var dropContainer = document.querySelector('.teaser .drops');
		var drops = Array.prototype.slice.call(document.querySelectorAll('.teaser .drops span'));
		var teaserWidth = teaser.scrollWidth;
		var activeDrop = 0;
		var ticking = false;

		function requestTick() {
			if(!ticking) {
				requestAnimationFrame(update);
			}
			ticking = true;
		}

		function update() {
			ticking = false;
			var currentDrop = Math.round((teaser.scrollLeft / teaserWidth) * 3);
			applyDrop(currentDrop);
		}

		function applyDrop(currentDrop) {
			if(activeDrop !== currentDrop) {
				drops[activeDrop].classList.remove('active');
				activeDrop = currentDrop;
				drops[activeDrop].classList.add('active');
			}
		}

		function navigateToDrop(e) {
			if(e.target.nodeName.toLowerCase() === 'span') {
				var currentDrop = drops.indexOf(e.target);
				applyDrop(currentDrop);
				teaser.scrollLeft = (currentDrop * teaserWidth) / 3;
			}
		}

		teaser.addEventListener('scroll', requestTick, false);
		dropContainer.addEventListener('click', navigateToDrop, false)

	}


})();