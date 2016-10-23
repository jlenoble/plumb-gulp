import gulp from 'gulp';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

const plumberArg = {
  errorHandler: function(err) {
    notify.onError({
      title: 'Gulp Error',
      message: 'Error: <%= error.message %>',
      sound: 'Bottle'
    })(err);
    this.emit('end');
  }
};

const _gulpsrc = gulp.src;

function src() {
  return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber(plumberArg));
};

export function useOriginalGulpSrc() {
  gulp.src = _gulpsrc;
}

export function usePlumbedGulpSrc() {
  gulp.src = src;
}

export function getOriginalGulpSrc() {return _gulpsrc;}
export function getPlumbedGulpSrc() {return src;}
