var gulp = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer');

var DEST_FOLDER = './dest/';
var SRC_FOLDER = './src/';
var PORT = 8001;

gulp.task('clean', function(){
  return gulp.src(DEST_FOLDER, {read: false})
    .pipe(clean());
});

gulp.task('server', function(){
  connect.server({
    root: DEST_FOLDER,
    port: PORT,
    livereload: true
  })
});

gulp.task('openURL', function(){
  gulp.src(DEST_FOLDER)
    .pipe(open({uri: 'http://localhost:' + PORT}))
});

gulp.task('process-vendors', function(){
  return gulp.src([
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/react/dist/react-with-addons.js",
    "node_modules/requirejs/require.js"
  ])
    .pipe(gulp.dest(DEST_FOLDER + "js/vendor"))
});

gulp.task('process-js', function() {
  return gulp.src(SRC_FOLDER + 'js/**/*.js')
    .pipe(plumber())
    .pipe(babel({modules: "amd"}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(DEST_FOLDER + 'js/'))
    .pipe(connect.reload());
});

gulp.task('process-html', function() {
  return gulp.src(SRC_FOLDER + 'index.html')
    .pipe(gulp.dest(DEST_FOLDER))
    .pipe(connect.reload());
});

gulp.task('process-sass', function() {
  return gulp.src(SRC_FOLDER + 'style/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(DEST_FOLDER + 'style/'))
    .pipe(connect.reload());
});

gulp.task('copy-files', function(){
  return gulp.src(SRC_FOLDER + '**/*')
    .pipe(gulp.dest(DEST_FOLDER))
});

gulp.task('watch', function(){
  gulp.watch(SRC_FOLDER + 'js/**/*.js', ['process-js']);
  gulp.watch(SRC_FOLDER + 'style/**/*.scss', ['process-sass']);
  gulp.watch(SRC_FOLDER + 'index.html', ['process-html']);
  //gulp.watch(SRC_FOLDER + '**/*', ['copy-files']);
});

gulp.task('default', ['clean'], function(){
  runSequence(
    ['process-html', 'process-vendors', 'process-js', 'process-sass'],
    ['server', 'watch'],
    'openURL',
    function(){
      gutil.log("Server Started!")
    }
  )
});




