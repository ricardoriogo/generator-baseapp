var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug){

	if(production == undefined) production = false;
	
	return gulp.src(config.sourcePath + 'sass/main.scss')
		.pipe($.if(debug == true, $.debug({ title: "Styles:" })))
		.pipe($.if(!production, $.sourcemaps.init()))
		.pipe($.cssGlobbing({
			extensions: ['.scss']
		}))
		.pipe($.sass({
			includePaths: ['bower_components/']
		}))
		.on('error', function(e) {
            $.util.log(e);
            $.util.log($.util.colors.red('Compilation Failed'));
            var notifier = require('node-notifier');
			notifier.notify({
				title: 'Compilation Failed',
				message: 'Compilation Failed',
				sound: true,
				wait: false
			}, function(error, response) {
				console.log(response);
			});
            this.emit('end');
        })
		.pipe($.autoprefixer({
			browsers: ['last 2 versions', '> 1% in BR']
		}))
		.pipe($.if(!production, $.sourcemaps.write()))
		.pipe($.if(production, $.cssnano()))
		.pipe(gulp.dest(config.publicPath + 'css'));
};
