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
gulp.task('watch', function () {
    gulp.run('build');
    var watch = require('gulp-watch');
    watch({ glob: './app/**/*.js'}, function (event) {
        gulp.run('build');
    });
});

// alt : `beefy app/app.js:public/app.js 8989 -- -t debowerify`
gulp.task("server", function () {
    var connect = require("connect");
    connect().use(connect.static(__dirname)).listen(8989);
    gulp.run("watch");
});
gulp.task('default', function () {
    gulp.run('build');
});
