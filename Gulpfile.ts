import gulp from "gulp";
import ts from "gulp-typescript";
import sourcemaps from "gulp-sourcemaps"

gulp.task("default", () =>
    // tslint:disable-next-line: no-console
    console.log("HI")
);

gulp.task('build:ts', () => {
    const tsProject = ts.createProject("tsconfig.json");

    const reporter = ts.reporter.fullReporter();

    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject(reporter));
});