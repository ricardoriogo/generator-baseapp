var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug) {

	if(production == undefined) production = false;
	
	return gulp.src(config.sourcePath + 'js/*.js')
		.pipe($.modernizr({
			options: [
				'mq',
				'classes'
			]
		}))
		.pipe($.uglify())
		.pipe(gulp.dest(config.publicPath + 'js'));
};