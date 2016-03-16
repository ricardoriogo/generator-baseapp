var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug){

	if(production == undefined) production = false;
    var imgDest = config.publicPath + 'img';

    return gulp.src(config.sourcePath + 'img/**/*')
		.pipe($.if(debug == true, $.debug({ title: "Images:" })))
        .pipe($.newer(imgDest))
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
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
		.pipe(gulp.dest(imgDest));
};
