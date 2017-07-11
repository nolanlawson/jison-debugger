'use strict';

var gulp = require('gulp');
var del = require('del');

var path = require('path');

// Load plugins
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),

    sourceFile = './app/scripts/app.js',

    destFolder = './dist/scripts',
    destFileName = 'app.js';


// Styles
gulp.task('styles', function () {
  return sass('app/styles/main.scss', {
    loadPath: 'app/',
    style: 'expanded'
  })
    .pipe(gulp.dest('dist/styles'));
});


// Scripts
gulp.task('scripts', function () {
  var bundler =browserify({
    entries: [sourceFile],
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  return bundler.bundle()
  // log errors if they happen
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(destFileName))
    .pipe(gulp.dest(destFolder));

});

// Scripts
gulp.task('scripts_debug', function () {
  var bundler = watchify(browserify({
    entries: [sourceFile],
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  }));

  function rebundle() {
    return bundler.bundle()
    // log errors if they happen
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source(destFileName))
      .pipe(gulp.dest(destFolder));
  }

  bundler.on('update', rebundle);

  return rebundle();
});




gulp.task('jade', function () {
  return gulp.src('app/template/*.jade')
    .pipe($.jade({ pretty: true }))
    .pipe(gulp.dest('dist'));
});



// HTML
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});



gulp.task('jest', function () {
  var nodeModules = path.resolve('./node_modules');
  return gulp.src('app/scripts/**/__tests__')
    .pipe($.jest({
      scriptPreprocessor: nodeModules + '/gulp-jest/preprocessor.js',
      unmockedModulePathPatterns: [nodeModules + '/react']
    }));
});

// Clean
gulp.task('clean', gulp.series(function () {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
}));

// Bower helper
gulp.task('bower', function() {
  return gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
    .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('worker', function() {
  return gulp.src('app/scripts/worker/**/*.js', {base: 'app/scripts/worker'})
    .pipe(gulp.dest('dist/worker'));
});

// Bundle
gulp.task('bundle',
          gulp.series('styles', 'scripts', 'bower', 'worker', function(){
            return gulp.src('./app/*.html')
              .pipe(gulp.dest('dist'));
          }));

// Bundle
gulp.task('bundle_debug', gulp.series('styles', 'scripts_debug', 'bower', 'worker', function(){
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('dist'));
}));

// Webserver
gulp.task('serve', function () {
  return gulp.src('./dist')
    .pipe($.webserver({
      port: 9000
    }));
});



gulp.task('json', function() {
  return gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
    .pipe(gulp.dest('dist/scripts/'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest('dist/'))
    .pipe($.size());
});

// Watch
gulp.task('watch', gulp.series('html', 'bundle_debug', 'images', 'serve', function () {

  // Watch .json files
  gulp.watch('app/scripts/**/*.json', gulp.series('json'));

  // Watch .html files
  gulp.watch('app/*.html', gulp.series('html'));


  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', gulp.series('styles'));



  // Watch .jade files
  gulp.watch('app/template/**/*.jade', gulp.parallel('jade', 'html'));


  // Watch image files
  gulp.watch('app/images/**/*', gulp.series('images'));
}));

// Build
gulp.task('build', gulp.series('html', 'bundle', 'images', 'extras'));

// Default task
gulp.task('default', gulp.series('clean', 'build', 'jest' ));
