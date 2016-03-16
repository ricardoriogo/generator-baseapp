var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug) {

	if(production == undefined) production = false;
	
	return gulp.src([
			'bower_components/jquery-waypoints/waypoints.js',
			'bower_components/jquery-validation/dist/jquery.validate.js',
			'bower_components/jquery-validation/src/localization/messages_pt_BR.js',
			'bower_components/history.js/scripts/bundled/html4+html5/jquery.history.js',
			'bower_components/gmap3/dist/gmap3.min.js',
			'bower_components/jquery.ui/ui/core.js',
			'bower_components/jquery.ui/ui/widget.js',
			'bower_components/jquery.ui/ui/menu.js',
			'bower_components/jquery.ui/ui/position.js',
			'bower_components/jquery.ui/ui/autocomplete.js',
			'bower_components/jquery-geocomplete/jquery.geocomplete.js',
			'bower_components/jquery.scrollTo/jquery.scrollTo.js',
			'bower_components/swiper/dist/js/swiper.jquery.js',
			'bower_components/slick-carousel/slick/slick.js'
		])
		.pipe($.concat('plugins.js'))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'js'));
};