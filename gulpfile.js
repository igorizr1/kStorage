var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({lazy: false}),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    clean = require('gulp-clean'),
    example = "example1"; //default example

var config = {
    EXAMPLE_SCRIPTS: [
        "kStorage.config.js",
        "app.js"
    ],
    SRC_SCRIPTS: [
        '!./**/*_test.js',
        "./src/kStorage.js"
    ],
    BOWER_SCRIPTS: [
        "./bower_components/angular/angular.min.js"
    ]
};

gulp.task('scripts_min_prod', function () {
    gulp.src(config.SRC_SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(concat('kStorage.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts_min', function () {
    var file_paths = config.EXAMPLE_SCRIPTS.map(function(v){
        return './examples/'+example+"/"+v;
    });

    gulp.src(file_paths)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev'));

    gulp.src(config.SRC_SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(concat('kStorage.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev'));
});

gulp.task('scripts_dev', function () {

    console.log("running____________example__________", example);
    var file_paths = config.EXAMPLE_SCRIPTS.map(function(v){
        return './examples/'+example+"/"+v;
    });
    gulp.src(file_paths)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev'));

    gulp.src(config.SRC_SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(concat('kStorage.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dev'));
});

gulp.task('vendorBOWER', function () {
    gulp.src(config.BOWER_SCRIPTS)
        .pipe(plugins.concat('bower-components.min.js'))
        .pipe(gulp.dest('./dev'));
    gulp.src('./bower_components/angular-sanitize/angular-sanitize.min.js.map')
        .pipe(gulp.dest('./dev'));
});

gulp.task('copy_index', function () {

    console.log('./examples/'+example+'/index.html');

    gulp.src('./examples/'+example+'/index.html')
        .pipe(gulp.dest('./dev'));
});

gulp.task('watch_min', function () {
    gulp.watch([
        'dev/**/*.html',
        'dev/**/*.js'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./**/*.js'], ['scripts_min']);
    gulp.watch('./examples/example'+example+'/index.html', ['copy_index']);
});

gulp.task('watch_dev', function () {
    gulp.watch([
        'dev/**/*.html',
        'dev/**/*.js'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./src/**/*.js', './examples/**/*.js'], ['scripts_dev']);
    gulp.watch('./examples/example'+example+'/index.html', ['copy_index']);
});

gulp.task('connect', plugins.connect.server({
    root: ['dev'],
    port: 9000,
    livereload: true
}));

gulp.task('clean', function () {
    return gulp.src('./dev', {read: false}).pipe(clean({force: true}));
});

gulp.task('set_example_1', function(){example = "example1";});

/**
 * run Examples START
 */
gulp.task('default',  ['set_example_1', 'scripts_dev', 'copy_index', 'vendorBOWER', 'watch_dev', 'connect']);
gulp.task('example1', ['set_example_1', 'scripts_dev', 'copy_index', 'vendorBOWER', 'watch_dev', 'connect']);

/**
 * RUN SCRIPT TO MINIFY LIBRARY
 */
gulp.task('dist',   ['scripts_min_prod']);

