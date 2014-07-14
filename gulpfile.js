var gulp    = require('gulp');
var bump    = require('gulp-bump');
var git     = require('gulp-git');
var mocha   = require('gulp-mocha');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('default', function() {
  // Do something here
});

gulp.task('lint', function() {
  return gulp.src('./**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('mocha', function() {
  return gulp.src('./test/*.js')
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('bump-version', function() {
  return gulp.src(['./package.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('tag', ['bump-version'], function() {
  var pkg     = require('./package.json');
  var v       = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});

gulp.task('npm', ['tag'], function(done) {
  return require('child_process')
    .spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('test', ['lint', 'mocha']);
gulp.task('release', ['npm']);
