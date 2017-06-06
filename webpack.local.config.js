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
            'onhout_globals/index.js',
            'onhout_globals/index.less',
            'wowjs',
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
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor-[hash].js'}),
    ],

    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}, // to transform JSX into JS
            {
                test: /\.less$/,
                loaders: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
            }, //to transform less into CSS
            {test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|gif|svg)(\?.*$|$)/, loader: 'url-loader?limit=100000'},//changed the regex because of an issue of loading less-loader for font-awesome.
            {test: /\.css$/, loaders: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},
        ],
    },

    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.jsx']
    },
};