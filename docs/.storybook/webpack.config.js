const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const autoprefixer = require("autoprefixer");
const postcssPseudoelements = require("postcss-pseudoelements");

module.exports = {
    resolveLoader: {
        root: path.resolve(__dirname, "../node_modules/")
    },
    resolve: {
        root: path.resolve(__dirname, "../node_modules/")
    },
    postcss: function() {
        return [
            autoprefixer({ browsers: ["last 5 versions", "> 0.02%", "ie >= 8"] }),
            postcssPseudoelements
        ];
    },
    module: {
        noParse: ["node_modules"],
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    "style-loader",
                    "css-loader?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]",
                    "postcss-loader?sourceMap",
                    "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
                ]
            },

            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "../../components"),
                    path.join(__dirname, "../../libs"),
                    path.join(__dirname, "../../helpers")
                ],
                loader: "babel"
            },

            { test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=[name].[hash].[ext]&limit=10000" },

            { test: /\.woff2?$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
            { test: /\.eot$/, loader: "file-loader?prefix=font/" },

            {
                test: /\.js$/,
                include: require.resolve("react"),
                loader: "expose?React"
            }
        ]
    }
};
