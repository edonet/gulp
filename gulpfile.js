'use strict';

// Load plugins
var path = require('path'),
    gulp = require('gulp'),
    walk = require('gulp-walk'),

    // sass
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),

    // jsh
    jsh = require('gulp-jsh'),

    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');


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


// Scripts
gulp.task('js', function() {
    return gulp.src('javascripts/*.js')
        .pipe(concat('all.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('assets'));
});


// Images
gulp.task('images', function() {
    return gulp.src('images/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('images'));
});


// Default task
gulp.task('default', function() {

    // gulp.start('sass', 'js', 'images');
});
