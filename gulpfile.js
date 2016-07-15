/// <binding BeforeBuild='prod-build' ProjectOpened='default' />
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var ts          = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');


var startpaths = {
  js: './frontend/js/**/*.ts',
  templates: './frontend/views/**/*.jade',
  bower: './bower_components/**/*',
  scss: './frontend/scss/**/*.scss',
  assets: './frontend/assets/**/*'
}

var endpaths = {
  js: './public/js/',
  html:'./public/',
  css: './public/css/',
  bower: './public/bower_components/',
  assets: './public/assets/'
}


gulp.task('typeScript', function () {
  console.log('Compiling frontend .ts from frontend/js/tsconfig.json.');
  var tsProject = ts.createProject('./frontend/js/tsconfig.json', { sortOutput: true });
  var tsc = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts({
      "noImplicitAny" : false,
      "target" : "es5",
      "module" : "commonjs"
    }))
    .pipe(concat('application.js'));
  return tsc.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(endpaths.js));
});

gulp.task('scripts', function () {
  return gulp.src(startpaths.js)
    .pipe(gulp.dest(endpaths.js));
});

gulp.task('assets', function () {
    gulp.src(startpaths.bower)
    .pipe(gulp.dest(endpaths.bower));
});

gulp.task('sass', function () {
  return gulp.src(startpaths.scss)
    .pipe(sourcemaps.init())
  .pipe(sass({
    style: 'expanded',
    // sourceComments: 'normal'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(endpaths.css))
});

gulp.task('templates', function () {
  return gulp.src(startpaths.templates)
  .pipe(jade({
    pretty:true
  }))
  .pipe(gulp.dest(endpaths.html))
});

gulp.task('serve', function() {
    browserSync.init({
      server: {
        baseDir: "./public",
      }
    });
});


gulp.task('reload', function() {
    browserSync.reload()
});


gulp.task('default', ['sass','scripts', 'typeScript', 'assets','templates','serve'], function () {
    gulp.watch([startpaths.templates,startpaths.js,startpaths.scss], ['build']);
});

gulp.task('build', ['sass','scripts', 'typeScript', 'assets','templates','reload']);
