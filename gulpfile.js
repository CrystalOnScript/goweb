var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var scriptsGlob = 'js/**/*.js';
var stylesGlob = 'scss/**/*.scss';

gulp.task('copy', function() {
    gulp.src([
    	'index.html',
    	'favicon.ico'
      ], { base: './' })
      .pipe(gulp.dest('dist/'));

    gulp.src('img/*')
      .pipe(gulp.dest('dist/img'));
});

// Sass
gulp.task('sass', function() {
    return gulp.src(stylesGlob)
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(scriptsGlob)
      .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/'));
});

// Watch Files For Changes
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });

    gulp.watch(scriptsGlob, ['scripts']);
    gulp.watch(stylesGlob, ['sass']);
    gulp.watch('index.html', ['copy']).on('change', browserSync.reload);

});

// Default Task
gulp.task('default', ['copy', 'sass', 'scripts', 'watch']);