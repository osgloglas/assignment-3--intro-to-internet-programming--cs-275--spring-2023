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

let compressHTML = () => {
    return src(`*.html`)
        .pipe(htmlCompressor({collapseWhitespace:true}))
        .pipe(dest(`prod/html`));
};

let lintCSS = () => {
    return src(`styles/main.css`)
        .pipe(cssLinter({
            reporters: [
                {formatter: `string`, console: true}
            ]}))
        .pipe(dest(`temp/css`));
};

let compressCSS = () => {
    return src(`style/*.css`)
        .pipe(cssCompressor())
        .pipe(dest(`prod/css`));
};

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.result(result => {
            // Called for each ESLint result.
            console.log(`ESLint result: ${result.filePath}`);
            console.log(`# Messages: ${result.messages.length}`);
            console.log(`# Warnings: ${result.warningCount}`);
            console.log(`# Errors: ${result.errorCount}`);
        }))
        .pipe(dest(`temp/js`));
};

let transpileJS = () => {
    return src(`js/*.js`)
        .pipe(jsTranspiler())
        .pipe(dest(`temp/js`));
};

let fixJS = () => {
    return src(`temp/*.js`)
        .pipe(jsCompressor())
        .pipe(jsTranspiler())
        .pipe(dest(`prod/js`));
};

//export
exports.default = series(
    lintCSS,
    lintJS,
    transpileJS,
    browserRefresh
);

exports.build = series(
    compressHTML,
    compressCSS,
    fixJS
);
