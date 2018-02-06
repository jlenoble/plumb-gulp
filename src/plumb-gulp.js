import gulp from 'gulp';

import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

const plumberArg = {
  errorHandler: function (err) {
    notify.onError({
      title: 'Gulp Error',
      message: '<%= error.message.split(\'\\n\')[0] %>',
      sound: 'Bottle',
    })(err);
    this.emit('end');
  },
};

const _gulpsrc = gulp.src;

function src (...args) {
  return _gulpsrc.apply(gulp, args)
    .pipe(plumber(plumberArg));
};

export function useOriginalGulpSrc () {
  gulp.src = _gulpsrc;
}

export function usePlumbedGulpSrc () {
  gulp.src = src;
}

export function getOriginalGulpSrc () {
  return _gulpsrc;
}
export function getPlumbedGulpSrc () {
  return src;
}

function srcMultipleFactory (times = 1, func = _gulpsrc) {
  // Use multiple times _gulpsrc and use src afterwards or vice versa
  times = parseInt(times, 10); // eslint-disable-line no-param-reassign
  if (times >= 1) {
    return function (...args) {
      const stream = func.apply(gulp, args);
      gulp.src = srcMultipleFactory(times - 1, func);
      return stream;
    };
  } else {
    return func === _gulpsrc ? src : _gulpsrc;
  }
}

export function useOriginalGulpSrcOnce () {
  gulp.src = srcMultipleFactory();
}

export function useOriginalGulpSrcTwice () {
  gulp.src = srcMultipleFactory(2);
}

export function useOriginalGulpSrcMultipleTimes (n) {
  gulp.src = srcMultipleFactory(n);
}

export function usePlumbedGulpSrcOnce () {
  gulp.src = srcMultipleFactory(1, src);
}

export function usePlumbedGulpSrcTwice () {
  gulp.src = srcMultipleFactory(2, src);
}

export function usePlumbedGulpSrcMultipleTimes (n) {
  gulp.src = srcMultipleFactory(n, src);
}
