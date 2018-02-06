const gulp = require('gulp');
const error = require('gulp-error');

gulp.task('subtest', function () {
  return gulp.src('gulpfile_original.js')
    .pipe(error());
});

gulp.task('default', gulp.parallel('subtest'));
