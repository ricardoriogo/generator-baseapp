var gulp = require('gulp-param')(require('gulp'), process.argv);
var runSequence = require('run-sequence');

module.exports = function() {
	runSequence(
		['copy', 'styles', 'scripts'],
		'revisions'
	);
};