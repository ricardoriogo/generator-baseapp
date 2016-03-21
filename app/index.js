'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fse = require('fs-extra');

var copy = function(src, dest, obj){
  return fse.copy(obj.templatePath(src), obj.destinationPath(dest), function (err) {
    if (err) return console.error(err);
  })
};

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `argAppName` a possible argument.
    this.argument('argAppName', { type: String, required: false });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = this._.camelize(this.argAppName) ||  this.appname;
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful' + chalk.red('Baseapp') + ' generator!'
    ));

    this.option('slim');
    this.option('lumen');
    this.option('laravel');

    // Prompts questions for user.
    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: 'Project Name:',
      default: this.appname
    },{
      // Checkbox options
      type: 'checkbox',
      name: 'bower',
      message: 'Select your Bower components',
      choices: [{
        name: 'Bootstrap',
        value: 'bootstrap-sass-official',
        checked: false
      },{
        name: 'Modernizr',
        value: 'modernizr',
        checked: true
      },{
        name: 'jQuery',
        value: 'jquery',
        checked: true
      },{
        name: 'jQuery Validation',
        value: 'jquery-validation',
        checked: true
      },{
        name: 'jQuery Waypoints',
        value: 'jquery-waypoints',
        checked: false
      },{
        name: 'jQuery ScrollTo',
        value: 'jquery.scrollTo',
        checked: false
      },{
        name: 'History JS',
        value: 'history.js',
        checked: false
      },{
        name: 'Breakpoint SASS',
        value: 'breakpoint-sass',
        checked: true
      },{
        name: 'Jeet Grid System',
        value: 'jeet.gs',
        checked: true
      },{
        name: 'Normalize SCSS',
        value: 'normalize-scss',
        checked: true
      }]
    },{
      // Checkbox options
      type: 'checkbox',
      name: 'gulp',
      message: 'Select your Gulp functions',
      choices: [{
        name: 'FTP',
        value: 'vinyl-ftp',
        checked: true
      }]
    }];

    this.gulp = [
      "gulp",
      "gulp-autoprefixer",
      "gulp-coffee",
      "gulp-concat",
      "gulp-copy",
      "gulp-css-globbing",
      "gulp-cssnano",
      "gulp-debug",
      "gulp-filter",
      "gulp-if",
      "gulp-imagemin",
      "gulp-load-plugins",
      "gulp-load-tasks",
      "gulp-newer",
      "gulp-param",
      "gulp-rename",
      "gulp-rev",
      "gulp-rev-outdated",
      "gulp-sass",
      "gulp-sourcemaps",
      "gulp-typescript",
      "gulp-uglify",
      "gulp-util",
      "main-bower-files",
      "node-notifier",
      "run-sequence"
    ];

    this.prompt(prompts, function (props) {
      // Add options to Object
      for (var key in props) {
        if (props.hasOwnProperty(key)) {
          if(typeof(this[key]) == "object"){
            this[key].concat(props[key]);
          } else {
            this[key] = props[key];
          }
          
          //console.log(this[key]);
        }
      }

      done();
    }.bind(this));
  },

  default: function () {
    if (this.options.slim) {
      var done = this.async();
      this.spawnCommand('composer', ['create-project', 'slim/slim-skeleton', '.', '--no-install'])
        .on('exit',function (){
          done();
        });
    } else if (this.options.lumen) {
      var done = this.async();
      this.spawnCommand('composer', ['create-project', 'laravel/lumen', '.', '--no-install'])
        .on('exit',function (){
          done();
        });
    } else if(this.options.laravel) {
      var done = this.async();
      this.spawnCommand('composer', ['create-project', 'laravel/laravel', '.', '--no-install', '--no-scripts'])
        .on('exit',function (){
          done();
        });
    }
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this
      );
    },

    projectfiles: function () {
      copy('editorconfig', '.editorconfig', this);
      copy('jshintrc', '.jshintrc', this);
      copy('tasks', '_tasks', this);
      copy('gulpfile.js', 'gulpfile.js', this);
      copy('gulpconf.json', 'gulpconf.json', this);
    }
  },

  install: function () {
    this.bowerInstall(this.bower, { 'save': true });

    this.gulp.push('gulp');
    this.npmInstall(this.gulp, { 'saveDev': true });

    if (this.options.slim || this.options.lumen || this.options.laravel) {
      var done = this.async();
      this.spawnCommand('composer', ['install', '--prefer-dist', '-vvv', '--profile'])
        .on('exit',function (){
          done();
        });

      this.spawnCommand('composer', ['run-script', 'post-create-project-cmd']);
    }
  }
});
