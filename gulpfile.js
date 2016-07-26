'use strict';

// Load plugins
var path = require('path'),
    gulp = require('gulp'),

    // sass
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),

    // jsh
    jsh = require('gulp-jsh'),
    rename = require('gulp-rename');


// Styles
gulp.task('sass', function() {
    var src = process.argv[3],
        dest;

    if (!src) {
        return false;
    }

    src = src.slice(1);
    dest = path.dirname(src);

    return gulp.src(src)
        .pipe(sass({ outputStyle: "compact" }))
        .pipe(autoprefixer('chrome 10', 'opera 12.1', 'ios 6', 'android 2'))
        .pipe(gulp.dest(dest));
});

// template
gulp.task('tpl', function () {
    var src = process.argv[3],
        dest;

    if (!src) {
        return false;
    }

    src = src.slice(1);
    dest = path.dirname(src);

    return gulp.src(src)
        .pipe(jsh({ cmd: true }))
        .pipe(rename({
            suffix: '.tpl',
            extname: '.js'
        }))
        .pipe(gulp.dest(dest));
});
