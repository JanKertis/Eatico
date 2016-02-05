const path = require('path');
const webpack = require('webpack');
const strip = require('strip-loader');
const writeStats = require('./utils/writeStats');
const CompressionPlugin = require('compression-webpack-plugin');
const assetsPath = path.resolve(__dirname, '../public/assets');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            './src/app/index.js'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        publicPath: '/public/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [strip.loader('debug'), 'babel?babelrc=false,presets[]=es2015,presets[]=stage-0,presets[]=react']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[hash:base64:10]')
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loaders: ['url?limit=8192']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.js']
    },
    plugins: [
        new ExtractTextPlugin('styles-[contenthash].css'),
        new CompressionPlugin({
            asset: '{file}.gz',
            algorithm: 'gzip'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        // hot reload
        new webpack.DefinePlugin({
            __CLIENT__: JSON.stringify(true),
            __SERVER__: JSON.stringify(false),
            'process.env': {

                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')

            }
        }),
        // optimizations
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),

        // stats
        function() { this.plugin('done', writeStats); }
    ]
};
