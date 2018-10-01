'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOriginalGulpSrc = useOriginalGulpSrc;
exports.usePlumbedGulpSrc = usePlumbedGulpSrc;
exports.getOriginalGulpSrc = getOriginalGulpSrc;
exports.getPlumbedGulpSrc = getPlumbedGulpSrc;
exports.useOriginalGulpSrcOnce = useOriginalGulpSrcOnce;
exports.useOriginalGulpSrcTwice = useOriginalGulpSrcTwice;
exports.useOriginalGulpSrcMultipleTimes = useOriginalGulpSrcMultipleTimes;
exports.usePlumbedGulpSrcOnce = usePlumbedGulpSrcOnce;
exports.usePlumbedGulpSrcTwice = usePlumbedGulpSrcTwice;
exports.usePlumbedGulpSrcMultipleTimes = usePlumbedGulpSrcMultipleTimes;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plumberArg = function plumberArg(options) {
  return {
    errorHandler: function errorHandler(err) {
      if (!options || !options.filterout || !options.filterout(err)) {
        _gulpUtil2.default.log(err.message);
      }

      // Hack not to hang gulp tasks
      this.emit('finish');
      this.emit('end');
    }
  };
};

var _gulpsrc = _gulp2.default.src;

var newSrc = function newSrc(options) {
  if (options || !src) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _gulpsrc.apply(_gulp2.default, args).pipe((0, _gulpPlumber2.default)(plumberArg(options)));
    };
  }

  return src;
};

var src = newSrc();

function useOriginalGulpSrc() {
  _gulp2.default.src = _gulpsrc;
}

function usePlumbedGulpSrc(options) {
  src = newSrc(options);
  _gulp2.default.src = src;
}

function getOriginalGulpSrc() {
  return _gulpsrc;
}
function getPlumbedGulpSrc() {
  return src;
}

function srcMultipleFactory() {
  var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _gulpsrc;

  // Use multiple times _gulpsrc and use src afterwards or vice versa
  times = parseInt(times, 10); // eslint-disable-line no-param-reassign
  if (times >= 1) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var stream = func.apply(_gulp2.default, args);
      _gulp2.default.src = srcMultipleFactory(times - 1, func);
      return stream;
    };
  } else {
    return func === _gulpsrc ? src : _gulpsrc;
  }
}

function useOriginalGulpSrcOnce() {
  _gulp2.default.src = srcMultipleFactory();
}

function useOriginalGulpSrcTwice() {
  _gulp2.default.src = srcMultipleFactory(2);
}

function useOriginalGulpSrcMultipleTimes(n) {
  _gulp2.default.src = srcMultipleFactory(n);
}

function usePlumbedGulpSrcOnce() {
  _gulp2.default.src = srcMultipleFactory(1, src);
}

function usePlumbedGulpSrcTwice() {
  _gulp2.default.src = srcMultipleFactory(2, src);
}

function usePlumbedGulpSrcMultipleTimes(n) {
  _gulp2.default.src = srcMultipleFactory(n, src);
}