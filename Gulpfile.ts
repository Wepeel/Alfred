import gulp from 'gulp';
import fs from 'fs';
import { resolve, join } from 'path';
import cp from 'child_process';
import os from 'os';


gulp.task("build", (cb: any) => {
    // get library path
    const lib = resolve(__dirname);

    fs.readdirSync(lib).forEach((mod) => {
        const modPath = join(lib, mod);

        // ensure path has package.json
        if (!fs.existsSync(join(modPath, 'package.json'))) {
            return;
        }

        // npm binary based on OS
        const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

        // install folder
        cp.spawn(npmCmd, ['run', 'build'], {
            env: process.env,
            cwd: modPath,
            stdio: 'inherit'
        });
    });

    cb();
});

gulp.task("build-images", (cb: any) => {
    // get library path
    const lib = resolve(__dirname);

    fs.readdirSync(lib).forEach((mod) => {
        const modPath = join(lib, mod);

        // ensure path has package.json
        if (!fs.existsSync(join(modPath, 'package.json'))) {
            return;
        }

        // npm binary based on OS
        const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

        // install folder
        cp.spawn(npmCmd, ['run', 'build-image'], {
            env: process.env,
            cwd: modPath,
            stdio: 'inherit'
        });
    });

    cb();
});

export const build = "build";