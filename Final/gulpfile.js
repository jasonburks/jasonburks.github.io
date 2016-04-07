var gulp = require('gulp');
var sass = require('gulp-sass');
var path =  require('path');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var php = require('gulp-connect-php');
var browserSync = require('browser-sync').create();

/*
 * Define Default Task
 */
gulp.task('default', ['sass', 'scripts', 'watch']);

/*
 * Define Build Task
 */
gulp.task('build', ['default', 'compress_scripts']);

/*
 * Serve Task - Watch CSS/JS/PHP files
 */
gulp.task('serve', ['sass', 'scripts','php', 'watch'], function() {

    browserSync.init({
        proxy: "localhost:8010",
    });

    gulp.watch('app/assets/js/scripts.js').on('change', browserSync.reload);
    gulp.watch('app/assets/css/*.css').on('change', browserSync.reload);
    gulp.watch('app/*.php').on('change', browserSync.reload);
});

/*
 * PHP Task
 */
gulp.task('php', function() {
    php.server({ base: 'app', port: 8010, keepalive: true});
});

/*
 * Concatenate and Compile SASS into CSS
 */
gulp.task('sass', function () {
  return gulp.src('./app/assets/scss/main.scss')
    .pipe(sass({
      paths: [ path.join(__dirname, 'scss', 'includes') ]
    }))
    .pipe(gulp.dest('./app/assets/css'))
    .pipe(browserSync.stream());
});

/*
 * Concatenate JS
 */
gulp.task('scripts', ['scripts_main', 'scripts_vendors']);

/*
 * Create 'scripts.js' file
 */

var jsMainFilesToConcat = [
  'app/assets/js/vendor/youtubemodal.js',
  'app/assets/js/_main.js'
];

gulp.task('scripts_main', function() {
  return gulp.src(jsMainFilesToConcat)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./app/assets/js/'));
});

/*
 * Create 'vendors.js' file
 */

var jsVendorsFilesToConcat = [
  'app/assets/vendor/jquery/dist/jquery.js',
  'app/assets/vendor/enquire/dist/enquire.min.js',
  'app/assets/vendor/bootstrap/js/transition.js',
  'app/assets/vendor/bootstrap/js/dropdown.js',
  'app/assets/vendor/bootstrap/js/collapse.js',
  'app/assets/vendor/bootstrap/js/modal.js',
  'app/assets/vendor/bootstrap/js/button.js',
];

gulp.task('scripts_vendors', function() {
  return gulp.src(jsVendorsFilesToConcat)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./app/assets/js/'));
});

/*
 *
 */

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/assets/js/**/*.js', ['scripts']);
    gulp.watch('app/assets/scss/**/*.scss', ['sass']);
});

/*
 * Create 'vendors.js' file
 */

var jsFilesToCompress = [
  'app/assets/js/scripts.js',
  'app/assets/js/vendors.js'
];

gulp.task('compress_scripts', function() {
  return gulp.src(jsFilesToCompress)
    .pipe(uglify().on('error', gutil.log))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/assets/js/'));
});

/*
 * TBD
 */

gulp.task('usemin', function() {
  return gulp.src('./app/**/*.php')
    .pipe(usemin({
      js: [ uglify(), rev() ],
      js2: [ uglify(), rev() ]
    }))
    .pipe(gulp.dest('./dist/'));
});