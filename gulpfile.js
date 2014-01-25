var gulp = require('gulp');
var gutil = require("gulp-util")
var browserify = require('gulp-browserify');
gulp.task('build', function () {
    return gulp.src('./app/app.js', { read: false })
        .pipe(browserify({
            transform: ["debowerify"],
            debug: true
        }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./app/**/*.js', ['build']);
});

// alt : `beefy app/app.js:public/app.js 8989 -- -t debowerify`
gulp.task("server", ["watch"], function () {
    var connect = require("connect");
    connect().use(connect.static(__dirname)).listen(8989);
});
gulp.task('default', ['build']);
