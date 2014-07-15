var gulp        = require('gulp');
var git         = require('gulp-git');
var mocha       = require('gulp-mocha');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');

gulp.task('default', function() {
  // Do something here
});

gulp.task('lint', function() {
  return gulp.src('./**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('mocha', ['lint'],  function() {
  return gulp.src(['./intercom.js', 'test/*.js'])
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('tag', function() {
  var pkg     = require('./package.json');
  var v       = 'v' + pkg.version;
  var message = 'Release ' + v;

  gulp.src('./').pipe(git.commit(message));
  git.tag(v, message);
  return git.push('origin', 'master', { args: ' --tags' }).end();
});

gulp.task('npm', ['tag'], function(done) {
  var spawn = require('child_process').spawn;
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('test', ['mocha']);

gulp.task('release', ['tag']);
// gulp.task('release', ['npm']);
