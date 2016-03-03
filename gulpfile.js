var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
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
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
          }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('sass-dist', function() {
    return gulp.src(stylesGlob)
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
          }))
        .pipe(gulp.dest('dist/css'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(scriptsGlob)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/'));
});

// Concatenate & Minify JS
gulp.task('scripts-dist', function() {
  return gulp.src(scriptsGlob)
      .pipe(concat('app.js'))
      .pipe(uglify())
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
gulp.task('dist', ['copy', 'sass-dist', 'scripts-dist']);