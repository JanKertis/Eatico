const path = require('path');
const webpack = require('webpack');
const writeStats = require('./utils/writeStats');
const notifyStats = require('./utils/notifyStats');
const assetsPath = path.resolve(__dirname, '../public/assets');
const port = parseInt(process.env.PORT, 10) + 1 || 3001;
const host = require('os').networkInterfaces().en0[1].address;

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'webpack-dev-server/client?http://' + host + ':' + port,
            'webpack/hot/only-dev-server',
            './src/app/index.js'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        publicPath: 'http://' + host + ':' + port + '/public/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?babelrc=false,presets[]=es2015,presets[]=stage-0,presets[]=react']
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']
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
            }
        ]
    },
    node: {
        console: false
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
        new webpack.optimize.OccurenceOrderPlugin(),
        // hot reload
        new webpack.DefinePlugin({
            __CLIENT__: JSON.stringify(true),
            __SERVER__: JSON.stringify(false),
            SERVER: false,
            CLIENT: true,
            __DEV__: JSON.stringify(true),
            PUSHER_APP_ID: JSON.stringify('1056b2069727ec807a99')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        // stats
        function () {
            this.plugin('done', notifyStats);
        },
        function () {
            this.plugin('done', writeStats);
        }
    ]
};
