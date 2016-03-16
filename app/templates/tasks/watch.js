var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production){
	if(config.watchers == undefined || config.watchers.length == 0) return;

	for (glob in config.watchers) {
		gulp.watch(config.sourcePath + glob, config.watchers[glob]);
	}
};