var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug) {

	if(production == undefined) production = false;
	
	return gulp.src(config.sourcePath + 'coffee/*.coffee')
		.pipe($.if(debug == true, $.debug({ title: "Scripts:" })))
		.pipe($.if(!production, $.sourcemaps.init()))
        .pipe($.concat('main.coffee'))
		.pipe($.coffee({ bare:true }))
		.on('error', function(e) {
            $.util.log(e);
            $.util.log($.util.colors.red('Compilation Failed'));
            var notifier = require('node-notifier');
			notifier.notify({
				title: 'Compilation Failed',
				message: 'Compilation Failed'
			});
			$.util.beep();
            this.emit('end');
        })
		.pipe(gulp.dest(config.sourcePath + 'js'))
		.pipe($.if(production, $.uglify()))
		.pipe($.if(!production, $.sourcemaps.write()))
		.pipe(gulp.dest(config.publicPath + 'js'));

};