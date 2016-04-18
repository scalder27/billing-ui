// Karma configuration
// Generated on Sat Jul 04 2015 13:27:35 GMT+0500 (RTZ 4 (зима))
const path = require("path");

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: __dirname,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine-jquery", "jasmine", "sinon", "es5-shim"],

        // list of files / patterns to load in the browser
        files: [
            "./node_modules/jasmine-sinon/lib/jasmine-sinon.js",
            "components/**/*.test.js"
        ],

        // list of files to exclude
        exclude: [
            "node_modules"
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "components/**/*.test.js": ["webpack", "sourcemap"]
        },

        webpack: {
            devtool: "#inline-source-map",
            module: {
                loaders: [
                    { test: /\.jsx?$/,
                        include: [
                            path.join(__dirname, "components")
                        ],
                        loader: "babel"
                    },
                    { test: /\.(jpe?g|png|gif|svg)$/i, loader: "null" },
                    { test: /\.css$/, loader: "null" },
                    { test: /\.scss$/, loader: "null" }
                ]
            },
            resolve: {
                modulesDirectories: [__dirname, "components", "node_modules"],
                extensions: ["", ".js"],
                root: __dirname
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("karma-jasmine"),
            require("karma-sinon"),
            require("karma-jasmine-jquery"),
            require("karma-es5-shim"),
            require("karma-notify-reporter"),
            require("karma-nyan-reporter"),
            require("karma-teamcity-reporter"),
            require("karma-phantomjs-launcher"),
            require("karma-sourcemap-loader")
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["nyan", "notify"],
        // reporters: ["nyan", "coverage", "notify"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["PhantomJS"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
