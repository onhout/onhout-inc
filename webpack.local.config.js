var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,

    entry: {
        main: ['main/js/main', 'main/less/main.less'],
        vendor: [
            'jquery',
            'jquery-ui-dist/jquery-ui',
            'jquery-validation',
            'onhout_globals/index.js',
            'onhout_globals/index.less',
            'bootstrap',
            'moment'
        ]
    }, // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

    output: {
        path: path.resolve('./onhout/static/dist/'),
        publicPath: '/static/dist/',
        chunkFilename: '[id]-[hash].chunk.js',
        filename: "[name]-[hash].js",
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
            $: 'jquery',             // bootstrap 3.x requires
            jQuery: 'jquery',        // bootstrap 3.x requires
            moment: 'moment',
        }),
        new ExtractTextPlugin('[name]-[hash].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash].js', Infinity),
    ],

    devtool: 'cheap-module-source-map',

    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}, // to transform JSX into JS
            {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")}, //to transform less into CSS
            {test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|gif|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'},//changed the regex because of an issue of loading less-loader for font-awesome.
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
        ],
    },

    resolve: {
        modulesDirectories: ['node_modules', 'static/components'],
        root: path.resolve('./src'),
        extensions: ['', '.js', '.jsx']
    },
};