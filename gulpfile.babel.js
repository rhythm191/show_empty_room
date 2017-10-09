import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpackStream from "webpack-stream";
import webpack from "webpack";
import fs from 'fs';

let json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

import webpackConfig from "./webpack.config.babel";

const $ = gulpLoadPlugins();

gulp.task('webpack', () =>  {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("build"));
})

gulp.task('manifest', () => {
  return gulp.src('src/manifest.json')
    .pipe($.jsonEditor({ version: json.version }))
    .pipe(gulp.dest('build'));
});

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('image', () => {
  return gulp.src('src/**/*.png')
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['manifest', 'html', 'image'])

gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'src/**/*.sass'], ['webpack'])
  gulp.watch('src/manifest.json', ['manifest']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.png', ['image']);
});
