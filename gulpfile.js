const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

gulp.task('html', done=>{
    gulp.src('src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('src/html_dist'))
        done();
});
