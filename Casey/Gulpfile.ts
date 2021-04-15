/*
 eslint @typescript-eslint/no-unsafe-assignment: "off",
 @typescript-eslint/no-var-requires: "off",
 @typescript-eslint/no-unsafe-call: "off",
 @typescript-eslint/no-unsafe-return: "off",
 @typescript-eslint/no-unsafe-member-access: "off",
 no-console: "off"
 */
import gulp from "gulp";
import ts from "gulp-typescript";
import sourcemaps from "gulp-sourcemaps";
const eslint = require('gulp-eslint');
import { exec } from "child_process";

gulp.task("default", (cb: any) => {
    cb();
});

gulp.task("build:tslint", () => {
    return gulp.src(['**s'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
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
    exec('docker build -t casey:latest -f Dockerfile .', (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb();
    });
});

const buildTS = gulp.series("build:proto-types", "build:tslint", "build:ts");


export const build = gulp.parallel("build:docs", buildTS);