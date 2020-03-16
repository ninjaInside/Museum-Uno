let gulp           = require('gulp')
	babel          = require('gulp-babel')
	sass           = require('gulp-sass')
	jshint         = require('gulp-jshint')
	uglify         = require('gulp-uglify-es').default
	clean          = require('del')
	concat 		   = require('gulp-concat')
	autopolyfiller = require('gulp-autopolyfiller')
	autoprefixer   = require('autoprefixer')
	mincss 		   = require('gulp-cssmin')
	uncss 		   = require('gulp-uncss')
	postcss 	   = require('gulp-postcss')
	fixjs 		   = require('gulp-fixmyjs')
	browserSync    = require('browser-sync').create()
	pug            = require('pug');

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.sass')
		.pipe(sass())
		.pipe(mincss())
		.pipe(postcss([autoprefixer([
			'last 10 version'
			])]))
		.pipe(concat('style.min.css'))
		.pipe(browserSync.reload({
				stream: true
		}))
		.pipe(gulp.dest('src/css'))
});

gulp.task('pug', function() {
	return gulp.src('src/html_temlates/**/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('src/'));
});

gulp.task('js-validate-minify-def', function() {
	return gulp.src('src/js/default_events/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(jshint())
		.pipe(fixjs())
		.pipe(uglify())
		.pipe(concat('scripts-modules.min.js'))
		.pipe(gulp.dest('dist/js/default_events'))
});	

gulp.task('js-validate-minify-cast', function() {
	return gulp.src('src/js/castom_events/*.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(jshint())
		.pipe(fixjs())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/castom_events'))
});

gulp.task('libs-concat-minify', function() {
	return gulp.src('src/libs/**/*.js')
		.pipe(uglify())
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('dist/libs'))
});

gulp.task('browser-sync', function() {
		browserSync.init({
			server: {
				baseDir: './src/html'
			},
		});
		browserSync.watch('src', browserSync.reload)
});

gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
});

gulp.task('serve', gulp.series(
	gulp.parallel('browser-sync', 'watch')
));

gulp.task('clean', async function() {
	return clean.sync('dist')
});

gulp.task('port-css', function() {
	return gulp.src('src/css/style.min.css')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('port-fonts', function() {
	return gulp.src('src/fonts/**')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('port-html', function() {
	return gulp.src('src/html/*.html')
		.pipe(gulp.dest('dist/html'));
});

gulp.task('port-img-back', function() {
	return gulp.src('src/image/backgrounds/*')
		.pipe(gulp.dest('dist/image/backgrounds'));
});

gulp.task('port-img-icon', function() {
	return gulp.src('src/image/icons/*')
		.pipe(gulp.dest('dist/image/icons'));
});

gulp.task('builder',gulp.series(
	'clean', 'sass', 'js-validate-minify-def', 
	'js-validate-minify-cast', 'libs-concat-minify', 'port-css', 
	'port-img-icon', 'port-img-back', 'port-html', 'port-fonts'), function() {
		return;
});