gulp = require('gulp');
gulpLoadPlugins = require('gulp-load-plugins');
package = require('./package.json');

const $ = gulpLoadPlugins();

gulp.task('manifest', () => {
  return gulp.src('src/manifest.json')
    .pipe($.jsonEditor({ version: package.version }))
    .pipe(gulp.dest('build/'));
});
