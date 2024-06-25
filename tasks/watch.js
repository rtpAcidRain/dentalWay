const { watch, parallel, series } = require("gulp");
const bs = require("browser-sync");

module.exports = function watching() {
  watch("src/**/*.html", parallel("html", "style"));
  watch("src/**/*.scss", parallel("style"));
  watch("src/**/*.js", parallel("dev_js", "style"));
  watch("src/**/*.json", parallel("html", "style"));
  watch("src/img/**/*.+(svg|ico)", parallel("rastr", "style"));
  watch("src/img/**/*.+(png|jpg|jpeg|gif)", series("rastr", "webp", "style"));
  watch("src/svg/css/**/*.svg", series("svg_css", "style"));
  watch("src/svg/**/*.svg", series("svg_sprite", "rastr", "style"));
  watch("src/fonts/**/*.ttf", series("ttf", "ttf2", "fonts", "style"));
};
