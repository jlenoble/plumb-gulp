const gulp = require('gulp');
const error = require('gulp-error');
const usePlumbedGulpSrc = require('../../build/src/plumb-gulp')
  .usePlumbedGulpSrc;

usePlumbedGulpSrc();

gulp.task('subtest', function () {
  return gulp.src('gulpfile_plumbed.js')
    .pipe(error());
});

gulp.task('default', gulp.parallel('subtest'));
