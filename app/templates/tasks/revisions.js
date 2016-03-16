var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var fs = require('fs');
var $ = require('gulp-load-plugins')();

module.exports = function(production, debug) {
	var manifestFileName = ((config.revisionFileName == undefined) ? 'rev-manifest.json' : config.revisionFileName );
	var manifest = config.publicPath + manifestFileName;
	var filter = [];

	try {
		fs.accessSync(manifest, fs.F_OK);

		var revisions = require('../' + manifest);

		for(item in revisions) {
			fs.unlinkSync(config.publicPath + revisions[item]);
		}
	} catch (e) {}

	return gulp.src([config.publicPath + 'css/*.css', config.publicPath + 'js/*.js'], {base: config.publicPath.replace(/^[\/\\]+|[\/\\]+$/gm,'')})
		//.pipe($.if(filter.length > 0, $.filter(filter)))
		.pipe($.if(debug == true, $.debug({ title: "Revisions:" })))
		.pipe(gulp.dest(config.publicPath + '/build'))  // copy original assets to build dir
		.pipe($.rev())
		.pipe(gulp.dest(config.publicPath))  // write rev'd assets to build dir
		.pipe($.rev.manifest(manifestFileName))
		//.pipe($.revOutdated(1))
		.pipe(gulp.dest(config.publicPath)); // write manifest to build dir
};