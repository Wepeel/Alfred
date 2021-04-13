import gulp from "gulp";
import ts from "gulp-typescript";
import sourcemaps from "gulp-sourcemaps";
import { exec } from "child_process";

// tslint:disable: no-console

gulp.task("default", (cb: any) => {
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

gulp.task("build:proto-types", (cb: any) => {
    exec('scripts\\build_proto_types.cmd', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb();
    });
});

gulp.task("build:docs", (cb: any) => {
    exec('cd scripts && .\\build_docs.cmd', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb();
    });
});