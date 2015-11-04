var gulp = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver'),
    opn = require('opn');

var DEST = './dest/';
var SRC = './src/';
var server = {
  host: 'localhost',
  port: '8001'
};

gulp.task('clean', function(){
  return gulp.src(DEST, {read: false})
    .pipe(clean());
});

gulp.task('server', function(){
  return gulp.src(DEST)
    .pipe(webserver({
      host: server.host,
      port: server.port,
      livereload: true,
      directoryListing: false
    }));
});

gulp.task('openURL', function(){
  opn('http://' + server.host + ':' + server.port);
});

gulp.task('compile-js', function() {
  return gulp.src(SRC + 'js/**/*.js')
    .pipe(plumber())
    .pipe(babel({modules: "amd"}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(DEST + 'js/'));
});

gulp.task('compile-html', function() {
  return gulp.src(SRC + 'index.html')
    .pipe(gulp.dest(DEST));
});

gulp.task('compile-sass', function() {
  return gulp.src(SRC + 'style/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(DEST + 'style/'));
});

gulp.task('watch', function(){
  gulp.watch(SRC + 'js/**/*.js', ['compile-js']);
  gulp.watch(SRC + 'style/**/*.scss', ['compile-sass']);
  gulp.watch(SRC + 'index.html', ['compile-html']);
});

gulp.task('default', ['clean'], function(){
  runSequence(
    ['compile-html', 'compile-js', 'compile-sass'],
    //['server', 'watch'],
    //'openURL'
    'watch'
  )
});




