// Load Node Modules/Plugins
var gulp         = require('gulp');
var browserSync  = require('browser-sync');

var plugin = {
  imagemin : require('gulp-imagemin'),
  scss     : require('gulp-sass'),
  copy     : require('gulp-copy')
}

files = {
  css  : ['app/css/main.scss'],
  img  : ['app/img/*'],
  html : ['app/*.html']
}

gulp.task('css', function() {
    return gulp.src(files.css)
      .pipe(plugin.scss())
      .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function() {
    return gulp.src(files.img)
      .pipe(plugin.imagemin())
      .pipe(gulp.dest('dist/img'));
});

gulp.task('html' , function() {
    return gulp.src(files.html)
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(files.css  , gulp.series('css'   , function(done) { browserSync.reload(); done(); }));
    gulp.watch(files.img  , gulp.series('images', function(done) { browserSync.reload(); done(); }));
    gulp.watch(files.html , gulp.series('html'  , function(done) { browserSync.reload(); done(); }));
});

gulp.task('browsersync', function() {
    return browserSync({
        server: {
             baseDir: './dist'
        }
    });
});

gulp.task('default', gulp.parallel('html','css', 'images','browsersync','watch'))

