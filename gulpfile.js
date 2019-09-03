const gulp = require('gulp'),
	  babel = require('gulp-babel'),
	  watch = require('gulp-watch'),
	  minify = require('gulp-minify');

gulp.task('default', () => {
    // Endless stream mode
    return watch('src/**/*.js', { ignoreInitial: false })
    	.pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});