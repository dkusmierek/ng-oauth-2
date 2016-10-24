var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

// Concatenate js files

var scripts = [
    'ng-oauth-2.js',
    './providers/*.js'
];

gulp.task('build', ['concatenate', 'minify']);

gulp.task('concatenate', function() {
    return gulp.src(scripts)
        .pipe(concat('ng-oauth-2.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', function() {
    return gulp.src(scripts)
        .pipe(concat('ng-oauth-2.js'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/'));
});