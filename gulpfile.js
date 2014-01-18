var gulp = require('gulp');
gulp.task('build', function () {
    gulp.src('./app/app.js', { read: false })
        .pipe(browserify({
            standalone: "app.js",
            transform: ["debowerify"],
            debug: true
        }))
        .pipe(gulp.dest('./public/'));
});
gulp.task('watch', function () {
    gulp.run('build');
    gulp.watch('./app/**/*.js', function () {
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
