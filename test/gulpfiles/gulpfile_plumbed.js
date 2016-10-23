var gulp = require('gulp');
var error = require('gulp-error');
var usePlumbedGulpSrc = require('../../build/src/plumb-gulp')
  .usePlumbedGulpSrc;

usePlumbedGulpSrc();

gulp.task('subtest', function() {
  return gulp.src('gulpfile_plumbed.js')
    .pipe(error());
});

gulp.task('default', gulp.parallel('subtest'));
