var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('static/dist/css'));
});

gulp.task('default',function() {
    gulp.watch('src/css/*.scss',['styles']);
});