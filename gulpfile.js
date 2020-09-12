
const gulp = require('gulp');  
const sass = require('gulp-sass');  
const browserSync = require('browser-sync');
const wait = require('gulp-wait');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task('styles', function() {
     gulp.src('./resources/sass/style.scss')
    .pipe(wait(1500))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./resources/css/'))
    .pipe(wait(1000))
    .pipe(postcss([autoprefixer]))
    .on("error", function(error) {
        this.emit("end");
        console.log(error.toString());
    })
    .pipe(gulp.dest("./resources/css/prefix"));
});

gulp.task('browser-sync', function() {  
    browserSync.init(["index.html", "./resources/css/prefix/style.css", "./resources/js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['styles', 'browser-sync'], function () {  
    gulp.watch("./resources/sass/**/*.scss", ['styles']);
    gulp.watch("index.html");
});

