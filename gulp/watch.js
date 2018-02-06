import gulp from 'gulp';
import {build} from './build';
import {test} from './test';

const allSrcGlob = [
  'src/**/*.js',
  'test/**/*.js',
  'docs/examples/**/*.js',
  '!src/static/antlr4/parsers/**/*.js',
];
const allBuildGlob = [
  'build/src/**/*.js',
  'build/test/**/*.js',
  'build/docs/examples/**/*.js',
];

export const watch = done => {
  gulp.watch(allSrcGlob, build);
  gulp.watch(allBuildGlob, test);
  done();
};

gulp.task('watch', watch);
