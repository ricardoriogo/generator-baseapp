var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../gulpconf.json');
var $ = require('gulp-load-plugins')();

$.mainBowerFiles = require('main-bower-files');

// grab libraries files from bower_components, minify and push in /public
module.exports = function(production, debug) {

        if(production == undefined) production = false;

        var jsFilter = $.filter('*.js', {restore: true});
        var cssFilter = $.filter('*.css', {restore: true});
        var fontFilter = $.filter(['*.eot', '*.woff', '*.svg', '*.ttf']);

        return gulp.src($.mainBowerFiles())
        .pipe($.if(debug == true, $.debug({ title: "Bower:" })))

        // grab vendor js files from bower_components, minify and push in /public
        .pipe(jsFilter)
        .pipe($.concat('plugins.js'))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'js'))
        .pipe(jsFilter.restore)

        // grab vendor css files from bower_components, minify and push in /public
        .pipe(cssFilter)
        .pipe($.concat('plugins.css'))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe($.cssnano())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(config.publicPath + 'css'))
        .pipe(cssFilter.restore)

        // grab vendor font files from bower_components and push in /public
        .pipe(fontFilter)
        .pipe($.flatten())
        .pipe(gulp.dest(config.publicPath + 'fonts'));
};

//require gulp-rename gulp-flatten gulp-filter main-bower-files