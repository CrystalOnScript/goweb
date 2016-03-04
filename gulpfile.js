var gulp = require('gulp');
var data = require('gulp-data');
var fs = require('fs');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();

var scriptsGlob = 'js/**/*.js';
var stylesGlob = 'scss/**/*.scss';
var pagesGlob = 'pages/**/*.+(html|nunjucks)';
var templatesGlob = 'templates/**/*.+(html|nunjucks)';

function getNunjucksData() {
  var front = JSON.parse(fs.readFileSync('data/front.json'));
  return {
    front: front
  };
}

gulp.task('nunjucks', function() {
  return gulp.src(pagesGlob)
    .pipe(data(getNunjucksData))
    .pipe(nunjucksRender({
      path: 'templates'
    }))
    .pipe(gulp.dest('dist'))
});


gulp.task('copy', function() {
    gulp.src([
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
    gulp.watch(pagesGlob, ['nunjucks']).on('change', browserSync.reload);
    gulp.watch(templatesGlob, ['nunjucks']).on('change', browserSync.reload);
    gulp.watch('data/**/*.json', ['nunjucks']).on('change', browserSync.reload);

});

// Default Task
gulp.task('default', ['nunjucks', 'copy', 'sass', 'scripts', 'watch']);
gulp.task('dist', ['nunjucks', 'copy', 'sass-dist', 'scripts-dist']);