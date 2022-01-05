const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const proxy = require('./proxyConfig');
const chokidar = require('chokidar');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer({
  ...webpackConfig.devServer,
  proxy
}, compiler);

// 下面这句代码会导致wds重启而报错：Error [ERR_SERVER_ALREADY_LISTEN]: Listen method has been called more than once without closing.
server.startCallback(() => {
  watchConfig();
});

function watchConfig() {
  chokidar.watch('./proxyConfig.js').on('change', async () => {
    console.log("checked dev-server proxy changes, restarting server");
    await server.stop();
    await server.start();
  });
}


