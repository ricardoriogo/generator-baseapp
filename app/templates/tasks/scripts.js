var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug) {

	if(production == undefined) production = false;
	
	return gulp.src(config.sourcePath + 'js/app.js')
		.pipe($.if(debug == true, $.debug({ title: "Scripts:" })))
		.pipe($.if(!production, $.sourcemaps.init()))
		.pipe($.if(production, $.uglify()))
		.pipe($.if(!production, $.sourcemaps.write()))
		.pipe(gulp.dest(config.publicPath + 'js'));

};