// tslint:disable: no-var-requires
const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("default", (cb) => {
    cb(); 
});

gulp.task('build:ts', () => {
    const tsProject = ts.createProject("tsconfig.json");

    const reporter = ts.reporter.fullReporter();

    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/"));
});