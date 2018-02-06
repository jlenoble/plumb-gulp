import gulp from 'gulp';
import {spawn} from 'child_process';
import childProcessData from 'child-process-data';
import {expect} from 'chai';
import {getOriginalGulpSrc, getPlumbedGulpSrc,
  useOriginalGulpSrc, usePlumbedGulpSrc} from '../src/plumb-gulp';

describe('plumb-gulp test suite', function () {
  this.timeout(5000); // eslint-disable-line no-invalid-this

  const gulpTest = gulpfile => {
    return childProcessData(spawn('gulp', [
      '--gulpfile',
      `test/gulpfiles/${gulpfile}`,
      'subtest',
    ]));
  };

  describe('Gulp is not plumbed by default', function () {
    it('gulp.src is the original function', function () {
      expect(gulp.src).to.equal(getOriginalGulpSrc());
    });

    it('gulp hangs/breaks on error', function () {
      return gulpTest('gulpfile_original.js').catch(err => {
        if (err.toString().match(
          /Intentional error when processing file gulpfile_original.js/)) {
          // Expected
        } else {
          throw err;
        }
      });
    });
  });

  describe('When Gulp is plumbed', function () {
    before(function () {
      usePlumbedGulpSrc();
    });

    it('gulp.src is the plumbed function', function () {
      expect(gulp.src).to.equal(getPlumbedGulpSrc());
    });

    it('gulp.src returns a harmless notification on error', function () {
      return gulpTest('gulpfile_plumbed.js').then(res => {
        expect(res.err()).to.equal('');
      });
    });

    after(function () {
      useOriginalGulpSrc();
    });
  });
});
