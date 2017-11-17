var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    browser = require('browser-sync'),
    partials = require('gulp-inject-partials'),
    autoprefixer = require('gulp-autoprefixer'),
    index = require('gulp-index');

gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({ gulpbrowsers: ['last 2 versions'] }))
    .pipe(gulp.dest('../css'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browser.reload({ stream: true }));
});

gulp.task('js', function () {
  gulp.watch('modules/**/*.js').on('change', function (file) {
    gulp.src(file.path)
      .pipe(babel({presets: ['es2015','react']}))
      //.pipe(uglify())
      .pipe(rename({ dirname: '' }))
      .pipe(gulp.dest('../scripts/core/controls'))
      .pipe(browser.reload({ stream: true, once: true }));
  });
});

gulp.task('modules', function () {
  gulp.watch('modules/**/*.html').on('change', function (file) {
    gulp.src(file.path)
      .pipe(wrap({ src: 'layout.html' }))
      .pipe(rename({ dirname: '' }))
      .pipe(gulp.dest('../html/modules'))
      .pipe(browser.reload({ stream: true }));
  });
});

gulp.task('html:buildIndex', function () {
  gulp.watch('../html/modules/*.*').on('change', function (file) {
    return gulp.src('../html/modules/*.*')
    .pipe(index({'item-template': (filepath, filename) => `<li class="index__item"><a class="index__item-link" href="${filepath}${filename}">${filepath}${filename}</a></li>`, 'section-heading-template': (heading) => ''}))
    .pipe(gulp.dest('../'))
    .pipe(browser.reload({ stream: true }));
  });
});

gulp.task('browser-sync', function () {
  browser.init(null, {
    server: {
      baseDir: "../"
    }
  });
});



gulp.task('watch', function () {
  gulp.watch(['scss/*.scss', 'scss/**/*scss', 'modules/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'js', 'modules', 'watch', 'html:buildIndex', 'browser-sync']);
