/// <vs SolutionOpened='watch' />

const postcssScss = require("postcss-scss");
const postcssSorting = require("postcss-sorting");
const autoprefixer = require("autoprefixer");
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")({
    pattern: ["gulp-*", "gulp.*"],
    replaceString: /\bgulp[\-.]/
});
const csscombOptions = require("./.csscomb.json");
const sortOrder = csscombOptions["sort-order"];

gulp.task("sass:comb", function() {
    return gulp.src("**/*.{scss, sass}")
        .pipe(plugins.postcss([
            autoprefixer({ add: false, browsers: [] }),
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
