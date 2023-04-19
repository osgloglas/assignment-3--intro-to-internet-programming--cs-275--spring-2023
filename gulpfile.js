//dependencies
const { src, dest, series } = require(`gulp`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssLinter = require(`gulp-stylelint`);
const jsTranspiler = require(`gulp-babel`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);
const cssCompressor = require(`gulp-uglifycss`);
const sync = require(`browser-sync`);

//functions
let browserChoice = `default`;

let browserRefresh = () => {
    sync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
            ]
        }
    });
};

let compressHTMLDev = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`temp`));
};

let compressHTMLProd = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`prod`));
};

let lintCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssLinter({
            reporters: [
                {formatter: `string`, console: true}
            ]}))
        .pipe(dest(`temp/styles`));
};

let compressCSS = () => {
    return src(`styles/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/styles`));
};

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.result(result => {
            // Called for each ESLint result.
            console.log(`ESLint result: ${result.filePath}`);
            console.log(`# Messages: ${result.messages.length}`);
            console.log(`# Warnings: ${result.warningCount}`);
            console.log(`# Errors: ${result.errorCount}`);
        }))
        .pipe(dest(`temp/scripts`));
};

let transpileJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsTranspiler())
        .pipe(dest(`temp/scripts`));
};

let fixJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsTranspiler())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};

let gulpLint = () => {
    return src(`gulpfile.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.result(result => {
            // Called for each ESLint result.
            console.log(`ESLint result: ${result.filePath}`);
            console.log(`# Messages: ${result.messages.length}`);
            console.log(`# Warnings: ${result.warningCount}`);
            console.log(`# Errors: ${result.errorCount}`);
        }));
};

//export
exports.default = series(
    lintCSS,
    lintJS,
    transpileJS,
    compressHTMLDev,
    browserRefresh
);

exports.build = series(
    compressHTMLProd,
    compressCSS,
    fixJS
);

//gulp lint
exports.lint = series(
    gulpLint
);
