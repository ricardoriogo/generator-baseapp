var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug){
    return gulp.src(config.sourcePath + 'assets/**/*.*')
		.pipe($.if(debug == true, $.debug({ title: "Copy:" })))
        .pipe($.copy(config.publicPath, { prefix: config.sourcePath.replace(/^[\/\\]+|[\/\\]+$/gm,'').split(/[\/\\]/).length + 1 }));
};