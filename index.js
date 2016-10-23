'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOriginalGulpSrc = useOriginalGulpSrc;
exports.usePlumbedGulpSrc = usePlumbedGulpSrc;
exports.getOriginalGulpSrc = getOriginalGulpSrc;
exports.getPlumbedGulpSrc = getPlumbedGulpSrc;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plumberArg = {
  errorHandler: function errorHandler(err) {
    _gulpNotify2.default.onError({
      title: 'Gulp Error',
      message: 'Error: <%= error.message %>',
      sound: 'Bottle'
    })(err);
    this.emit('end');
  }
};

var _gulpsrc = _gulp2.default.src;

function src() {
  return _gulpsrc.apply(_gulp2.default, arguments).pipe((0, _gulpPlumber2.default)(plumberArg));
};

function useOriginalGulpSrc() {
  _gulp2.default.src = _gulpsrc;
}

function usePlumbedGulpSrc() {
  _gulp2.default.src = src;
}

function getOriginalGulpSrc() {
  return _gulpsrc;
}
function getPlumbedGulpSrc() {
  return src;
}