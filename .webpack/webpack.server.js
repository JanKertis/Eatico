/* eslint no-console:0 */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./dev.config');
const host = require('os').networkInterfaces().en0[1].address;
const port = parseInt(process.env.PORT, 10) + 1 || 3001;
const serverOptions = {
    contentBase: 'http://' + host + ':' + port,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
};
const compiler = webpack(config);
const webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(port, host, () => {
    console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
});
