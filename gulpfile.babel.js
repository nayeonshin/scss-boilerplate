import gulp from "gulp";

import autoprefixer from "gulp-autoprefixer";
import del from "del";
import minify from "gulp-csso";
import sass from "gulp-sass";

sass.compiler = require("node-sass");

const routes = {
  css: {
    dest: "dist/css",
    src: "src/scss/style.scss",
    watch: "src/scss/*",
  },
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const watch = () => {
  gulp.watch(routes.css.watch, styles);
};

const clean = () => del(["dist/css/style.css"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
