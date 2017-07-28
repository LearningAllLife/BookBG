const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('pre-test', () => {
    return gulp.src([
            './app/**/*.js',
            './server.js'
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js'
        ])
        .pipe(mocha({

        }))
        .pipe(istanbul.writeReports());
});