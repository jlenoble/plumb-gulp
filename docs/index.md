# plumb-gulp
A small utility to plumb and unplumb Gulp at will

## Overriding `gulp.src`

To prevent pipes from breaking on error, you can use gulp plugin [gulp-plumber](https://www.npmjs.com/package/gulp-plumber). Now rather than plumbing each and every time you source something with [Gulp](https://www.npmjs.com/package/gulp), you can override the method `gulp.src` once and for all like the following:

```js
import gulp from 'gulp';

const _gulpsrc = gulp.src;
gulp.src = function() {
  return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber({
      errorHandler: function(err) {
        console.error(err);
        this.emit('end');
      }
    }));
}
```

This works fine, but when testing a gulp plugin, you may want sometimes gulp to be plumbed (for your TDD), and not to be plumbed (to check how your exceptions behave natively throughout your plugin).

`plumb-gulp` provides a few utility functions to switch back and forth from plumbed pipes to unplumbed pipes.

## Simple usage

For a simple use, you can simply call the functions `usePlumbedGulpSrc` and `useOriginalGulpSrc`, like so:

```js
import {usePlumbedGulpSrc, useOriginalGulpSrc} from 'plumb-gulp';

usePlumbedGulpSrc(); // gulp.src is now overridden
useOriginalGulpSrc(); // back to native gulp.src
```

## Controlled usage

You may want to run tests where for a few calls, your pipes are plumbed (or not), then reverted back to a default state.

The functions `useOriginalGulpSrcOnce`, `useOriginalGulpSrcTwice`,
`useOriginalGulpSrcMultipleTimes`, `usePlumbedGulpSrcOnce`,
`usePlumbedGulpSrcTwice` and `usePlumbedGulpSrcMultipleTimes` allow for such cases.

* `useOriginalGulpSrcOnce()`: Next time `gulp.src` is called, it will be the original `gulp.src` method; Afterwards it will be the plumbed one.
* `useOriginalGulpSrcTwice()`: The two next times `gulp.src` is called, it will be the original `gulp.src` method; Afterwards it will be the plumbed one.
* `useOriginalGulpSrcMultipleTimes(n)`: For the n next calls, `gulp.src` will be the original `gulp.src` method; Afterwards it will be the plumbed one.
* `usePlumbedGulpSrcOnce()`: Next time `gulp.src` is called, it will be the plumbed `gulp.src` method; Afterwards it will be the original one.
* `usePlumbedGulpSrcTwice()`: The two next times `gulp.src` is called, it will be the plumbed `gulp.src` method; Afterwards it will be the original one.
* `usePlumbedGulpSrcMultipleTimes(n)`: For the n next calls, `gulp.src` will be the plumbed `gulp.src` method; Afterwards it will be the original one.

## Getters

You can access the original `gulp.src` method or the plumbed one any time by using the getters `getOriginalGulpSrc` and `getPlumbedGulpSrc`.

## License

plumb-gulp is [MIT licensed](./LICENSE).

© 2016-2018 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
