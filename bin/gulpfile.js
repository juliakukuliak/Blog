var gulp = require('gulp');  
var browserify = require('gulp-browserify');  
var concat = require('gulp-concat');  
var refresh = require('gulp-livereload');  
var lr = require('tiny-lr');  
var server = lr();

gulp.task('lr-server', function() {  
    server.listen(3000, function(err) {
        if(err) return console.log(err);
    });
});
gulp.task('scripts', function() {  
    gulp.src(['public/*.js'])
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
});

gulp.task('default', ['lr-server'], function() {  
      gulp.watch('public/', ['scripts']);
});
