var gulp = require('gulp');
var mocha = require('gulp-mocha');
var bump = require('gulp-bump');
var eslint = require('gulp-eslint');
var istanbul = require('gulp-istanbul');

gulp.task('lint-src', function() {
    return gulp.src('src/**/*.js').
        pipe(eslint()).
        pipe(eslint.format()).
        pipe(eslint.failAfterError());
});

gulp.task('lint-test', function() {
    return gulp.src('test/**/*.js').
        pipe(eslint()).
        pipe(eslint.format()).
        pipe(eslint.failAfterError());
});

gulp.task('lint-root', function() {
    return gulp.src('*.js').
        pipe(eslint()).
        pipe(eslint.format()).
        pipe(eslint.failAfterError());
});

gulp.task('bump', function() {
    return gulp.
        src('package.json').
        pipe(bump({type: 'patch'})).
        pipe(gulp.dest('./'));
});

gulp.task('test-coverage', function () {
    return gulp.src(['./src/**/*.js']).
        pipe(istanbul()).
        pipe(istanbul.hookRequire()).
        on('finish', function () {
            gulp.src(['./test/index.js']).
                pipe(mocha()).
                pipe(istanbul.writeReports());
        });
});

gulp.task('test', function () {
  return gulp.src(['./test/index.js'])
    .pipe(mocha());
});

gulp.task('lint', gulp.parallel(['lint-src', 'lint-test', 'lint-root']));

gulp.task('dist', gulp.series(['lint', 'test-coverage']));
