import gulp from 'gulp';
import {expect} from 'chai';
import {getOriginalGulpSrc, getPlumbedGulpSrc, useOriginalGulpSrc,
  useOriginalGulpSrcOnce, useOriginalGulpSrcTwice,
  useOriginalGulpSrcMultipleTimes, usePlumbedGulpSrcOnce,
  usePlumbedGulpSrcTwice, usePlumbedGulpSrcMultipleTimes}
  from '../src/plumb-gulp';

describe('plumb-gulp test suite', function () {
  describe('Using multiple times original gulp.src', function () {
    beforeEach(function () {
      useOriginalGulpSrc();
    });

    it('Using it once', function () {
      useOriginalGulpSrcOnce();
      gulp.src('gulpfile.babel.js');
      expect(gulp.src).to.equal(getPlumbedGulpSrc());
    });

    it('Using it twice', function () {
      useOriginalGulpSrcTwice();
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      expect(gulp.src).to.equal(getPlumbedGulpSrc());
    });

    it('Using it 5 times', function () {
      useOriginalGulpSrcMultipleTimes(5);
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      expect(gulp.src).to.equal(getPlumbedGulpSrc());
    });

    afterEach(function () {
      useOriginalGulpSrc();
    });
  });

  describe('Using multiple times plumbed gulp.src', function () {
    beforeEach(function () {
      useOriginalGulpSrc();
    });

    it('Using it once', function () {
      usePlumbedGulpSrcOnce();
      gulp.src('gulpfile.babel.js');
      expect(gulp.src).to.equal(getOriginalGulpSrc());
    });

    it('Using it twice', function () {
      usePlumbedGulpSrcTwice();
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      expect(gulp.src).to.equal(getOriginalGulpSrc());
    });

    it('Using it 5 times', function () {
      usePlumbedGulpSrcMultipleTimes(5);
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      gulp.src('gulpfile.babel.js');
      expect(gulp.src).to.equal(getOriginalGulpSrc());
    });

    afterEach(function () {
      useOriginalGulpSrc();
    });
  });
});
