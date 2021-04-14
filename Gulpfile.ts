import gulp from "gulp";
import ts from "gulp-typescript";
import sourcemaps from "gulp-sourcemaps";
import tslint from "gulp-tslint";
import { exec } from "child_process";

// tslint:disable: no-console

gulp.task("default", (cb: any) => {
    cb();
});

gulp.task('build:tslint', () => {
    return gulp.src("**/*.ts")
        .pipe(tslint({
            configuration: "tslint.json",
            formatter: "verbose",
            fix: true
        }))
        .pipe(tslint.report());
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

gulp.task("docker:build-image", (cb: any) => {
    exec('docker build -t alfred:latest', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb();
    });
});

const buildTS = gulp.series("build:proto-types", "build:tslint", "build:ts");


export const build = gulp.parallel("build:docs", buildTS);