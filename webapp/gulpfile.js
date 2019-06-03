var gulp = require('gulp');
var scss = require('gulp-scss');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var cssnano = require('gulp-cssnano')
var del = require('del');
var process = require('process');
var htmlmin = require('gulp-htmlmin');//html压缩
process.env.NODE_ENV = 'development';
var replace = require('gulp-replace');

var paths = {
  styles: {
    src: './build/**/*.css',
    dest: './build'
  },
  scripts: {
    src: './build/**/*.js',
    dest: './build'
  },
  html: {
    src: './build/*.html',
    dest: './build'
  }
};

// cdn 加速域名
var cdnPrex = '//denoer-1255609850.file.myqcloud.com'
/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del(['/build/article.css'], ['/build/article.js'], ['/build/index.html'], ['/build/article.html']);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src,'!./build/static/css/*')
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(cssnano())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src([paths.scripts.src,'!./build/service-worker.js','!./build/static/js/*'], { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function insertCDNPre() {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  return gulp.src(paths.html.src)
    .pipe(replace(/href="\//g, `href="${cdnPrex}/`))
    .pipe(replace(/src="\//g, `src="${cdnPrex}/`))
    .pipe(htmlmin(options))
    .pipe(gulp.dest('build/'));
}

function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(gulp.parallel(styles, scripts),insertCDNPre);

// var build = gulp.series(gulp.parallel(insertCDNPre));
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;