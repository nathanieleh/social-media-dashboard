// initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// use dart-sass for @use
// sass.compiler = require('dart-sass');

// Sass task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true }) // takes main scss file and modifies this file
        .pipe(sass()) // pipe runs functions one after the other (function in gulp) compiles sass to css
        .pipe(postcss([autoprefixer(), cssnano()])) // autoprefixer adds browser prefixes to support older browsers and cssnano minimizes the css file
        .pipe(dest('dist', { sourcemaps: '.' })); // sets destination of final compiled css file into dist folder, right means set the same location as the file we specified
}

// JS task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
      .pipe(babel({ presets: ['@babel/preset-env'] })) // makes modern javascript compatible for older browsers
      .pipe(terser()) // minifies javascript file
      .pipe(dest('dist', { sourcemaps: '.' }));
}

// BrowserSync makes a local server and syncs to local files and making changes automatically reloads the website
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        },
    notify: {
        styles:{
            top: 'auto',
            bottom: '0',
        },
    },
    });
    cb(); // callback function indicates that the task is complete
}
function browserSyncReload(cb) { // reload the browser when a file is changed
    browserSync.reload();
    cb();
}

// Watch Task
function watchTask() { // will keep running
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

// Defualt Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask); // this is what gulp will run when you run gulp