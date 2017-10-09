gulp = require('gulp');
gulpLoadPlugins = require('gulp-load-plugins');
package = require('./package.json');

const $ = gulpLoadPlugins();

gulp.task('manifest', () => {
  return gulp.src('src/manifest.json')
    .pipe($.jsonEditor({ version: package.version }))
    .pipe(gulp.dest('build/'));
});

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('image', () => {
  return gulp.src('src/**/*.png')
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['manifest', 'html', 'image'])

gulp.task('watch', function() {
  gulp.watch('src/manifest.json', ['manifest']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.png', ['image']);
});
