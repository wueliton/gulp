const { series, src, watch } = require("gulp");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const webp = require("gulp-webp");

function css() {
  return src(["./assets/css-source/**/*.{scss,css}"])
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("assets/css/"));
}

function script() {
  return src(["./assets/script-source/**/*.js"])
    .pipe(concat("default.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js/"));
}

function images() {
  return src(["./assets/images/**/*.{jpg,png}"])
    .pipe(webp())
    .pipe(gulp.dest("./assets/images"));
}

exports.css = css;
exports.images = images;
exports.scripts = script;
exports.default = series(css, images, script);
exports.watch = function () {
  watch("./assets/css-source/**/*.scss", css);
  watch("./assets/images/**/*.{jpg,png}", images);
  watch("./assets/script-source/**/*.js", script);
};
