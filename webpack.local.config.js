const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        vendor: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            'jquery',
            'jquery-ui-dist/jquery-ui',
            'jquery-validation',
            'bootstrap',
            'popper.js',
            'moment',
            './src/onhout_globals/global.js',
            './src/onhout_globals/global.less'
        ],
        main: [
            './src/index'
        ]
    },

    output: {
        path: path.resolve('./onhout/static/'),
        publicPath: 'http://localhost:3000/static/',
        filename: "[name]-[hash].js",
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment',
            Popper: ['popper.js', 'default']
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), //VERY IMPORTANT, instead of using HOT in server.js
        new CleanWebpackPlugin('./static/'),
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                commons: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                }
            }
        }
    },

    devtool: 'cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {presets: ['react', 'es2015', 'stage-3'], plugins: ['transform-runtime']}
            }, // to transform JSX into JS
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader!resolve-url-loader!less-loader?sourceMap"
                })
            }, //to transform less into CSS
            {test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|gif|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'},//changed the regex because of an issue of loading less-loader for font-awesome.
            {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},
        ],
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            './node_modules'
        ],
        extensions: ['.js', '.jsx']
    }
};