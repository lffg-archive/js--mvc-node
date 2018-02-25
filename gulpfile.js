const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

let count = 1;

gulp.task('build', [ 'sass' ]);
gulp.task('dev', [ 'sass', 'watch' ]);

gulp.task('watch', function () {
  gulp.watch([
    './public/assets/css/scss/*.scss',
    './public/assets/css/scss/**/*.scss',
    './public/assets/css/scss/**/**/*.scss',
    './public/assets/css/scss/**/**/**/*.scss'
  ], [ 'sass' ]);
});

gulp.task('sass', function () {
  gulp.src('./public/assets/css/scss/index.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/assets/css'))
  ;

  console.log('\x1b[31m', '[GULP -- INFO] Currently compiling SCSS.');
  console.log('\x1b[0m', `[GULP -- INFO] You are currently in task ${count}.`);
  count++;
});