var gulp = require('gulp');
var browserify = require('gulp-browserify');
var level = require('level'),
    db = level('./cachefy');
var cacheify = require('cacheify');
var debowerify = require("debowerify");
var debowerCacheify = cacheify(debowerify, db);
gulp.task('build', function () {
    return gulp.src('./app/app.js', { read: false })
        .pipe(browserify({
            transform: [debowerCacheify],
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
