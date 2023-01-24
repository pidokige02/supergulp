import gulp from "gulp";
// const gulp = require ("gulp");
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";


const routes = {
  pug: {
    watch: "src/**/*.pug",  // src 아래 all directory의 pug file 을 들여다본다
    src: "src/*.pug",
    dest: "build"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  }
};

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build/"]);

// export const dev = gulp.series([clean, pug]);
// 위의 것은 test 를 위해 temp 로 만든 것임

const webserver = () =>
    gulp.src("build").pipe(ws({ livereload: true, open: true }));
// build directory 아래의 것을 webserver 를 이용하여 loading 한다는 의미임.

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
};

const prepare = gulp.series([clean, img]);
// big image 같은 경우는 시간이 많이 걸리기 때문에 dev 준비 과정에서 처리한다.

const assets = gulp.series([pug]);

const live = gulp.parallel([webserver, watch]);

// export const dev = gulp.series([prepare, assets]);

export const dev = gulp.series([prepare, assets, live]);