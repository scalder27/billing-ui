/// <vs SolutionOpened='watch' />

const postcssScss = require("postcss-scss");
const postcssSorting = require("postcss-sorting");
const autoprefixer = require("autoprefixer");
const perfectionist = require("perfectionist");
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")({
    pattern: ["gulp-*", "gulp.*"],
    replaceString: /\bgulp[\-.]/
});
const csscombOptions = require("./.csscomb.json");
const sortOrder = csscombOptions["sort-order"];

gulp.task("sass:comb", function() {
    return gulp.src([
        "**/*.{scss, sass}",
        "!**/_product_icons.scss",
        "!**/_**-settings.scss",
        "!node_modules/**/*.{scss, sass}",
        "!**/node_modules/**/*.{scss, sass}",
    ])
        .pipe(plugins.postcss([
            autoprefixer({ add: false, browsers: [] }),
            perfectionist({
                cascade: true,
                colorCase: "lower",
                colorShorthand: true,
                format: "expanded",
                indentSize: 4,
                trimLeadingZero: true,
                trimTrailingZeros: true,
                maxAtRuleLength: 80,
                maxSelectorLength: 4,
                maxValueLength: 80,
                sourcemap: false,
                syntax: "scss",
                zeroLengthNoUnit: true
            }),
            postcssSorting({
                "sort-order": sortOrder,
                "empty-lines-between-children-rules": 1
            })
        ], { syntax: postcssScss }))
        .pipe(plugins.eol())
        .pipe(plugins.bom())
        .pipe(gulp.dest(""));
});

gulp.task("watch", function() {
    gulp.watch("scss_settings/**/*.{scss, sass}", ["sass:comb"], function(evt) {
        if (evt.type === "deleted") {
            delete plugins.cached.caches["sass"][evt.path];
        }
    });
});
