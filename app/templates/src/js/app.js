var app = {
	mainNav: true,
	out: false 
};

app.init = function(){
	//app.mainNav = $('.main-nav');

	for (module in app) {
		if (typeof(app[module].init) == 'function') {
			app[module].init();
		}
	}
};

app.banner = {
	init: function() {
		this.home = new Swiper ('.swiper-container', {
			// Optional parameters
			loop: true,
			autoplay: 8000, 
			// If we need pagination
			pagination: '.swiper-pagination',

			// Navigation arrows
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev'//,

			//autoHeight: true
		});
	}
};

app.menu = {
	init: function(){
		$('.menu-trigger').on('click', function(){
			$('body').toggleClass('nav-opened');
		});
	}
}; 

$(function(){
	app.init();
});