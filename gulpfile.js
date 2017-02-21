'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const debug = require('gulp-debug');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pngquant = require('imagemin-pngquant');


gulp.task('scss', function () {
	return gulp.src('src/style/**/*.scss', {base: 'src'})
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'style',
					message: err.message
				};
			})
		}))
		// .pipe(sourcemaps.init())
	    .pipe(sass({
	    	includePaths: require('node-reset-scss').includePath
	    }))
	    .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
	    .pipe(cssnano())
	    .pipe(concat('main.min.css'))
	    // .pipe(sourcemaps.write())
	    .pipe(gulp.dest('public/style'));
});

gulp.task('js', function(){
	return gulp.src('src/js/**/*.js', {base: 'src'})
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'style',
					message: err.message
				};
			})
		}))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('public/js'))
});

gulp.task('libs:js', function(){
	return gulp.src(['src/lib/jQuery/*.js', 'src/lib/**/slick.min.js'])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('public/js'));
});

gulp.task('libs:css', function(){
	return gulp.src(['src/lib/**/slick.css'])
		.pipe(cssnano())
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('public/style'));
});

gulp.task('assets', function(){
	return gulp.src('src/assets/**')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'assets',
					message: err.message
				};
			})
		}))
		.pipe(newer('public'))
		.pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant()]
            }
		))
		.pipe(gulp.dest('public'));
});

gulp.task('html', function(){
	return gulp.src('src/*.html')
    .pipe(gulp.dest('public'));
});

gulp.task('clean', function(){
	return del('public');
});

gulp.task('fonts', function(){
	gulp.src('src/fonts/**/*') 
    .pipe(gulp.dest('public/style/fonts'));
});

gulp.task('build', ['assets', 'scss', 'html', 'fonts', 'js', 'libs:js', 'libs:css']);

gulp.task('watch', function(){
	gulp.watch('src/style/**/*.*', ['scss'] );
	
	gulp.watch('src/*.html', ['html'] );
	
	gulp.watch('src/assets/**', ['assets'] );

	gulp.watch('src/fonts/**', ['fonts'] );

	gulp.watch('src/js/**', ['js'] );

	gulp.watch('src/lib/**', ['libs:js', 'libs:css'] );
});

gulp.task('server', function(){
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', ['watch', 'server']);