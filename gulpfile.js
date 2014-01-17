var gulp = require('gulp');
var browserify = require('gulp-browserify');
gulp.task('build', function () {
    gulp.src('./app/*.js')
        .pipe(browserify({
            transform: ["debowerify"],
            debug: true
        }))
        .pipe(gulp.dest('./public/'));
});
gulp.task('watch', function () {
    gulp.watch('./app/**/*.js', function () {
        gulp.run('build');
    });
});

gulp.task("server", function () {
    var connect = require("connect");
    connect().use(connect.static(__dirname)).listen(8989);
    gulp.run("watch");
});
gulp.task('default', function () {
    gulp.src('./app/**/*.js')
        .pipe(browserify({
            transform: ["debowerify"],
            debug: true
        }))
        .pipe(gulp.dest('./public/'));
});
