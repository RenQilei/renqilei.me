var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');

gulp.task('styles', function() {
    gulp.src('src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        // .pipe(cleanCss())
        .pipe(gulp.dest('static/css'));
});

gulp.task('default',function() {
    gulp.watch('src/css/**/*.scss',['styles']);
});