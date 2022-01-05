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

function createServer() {
  const server = new WebpackDevServer({
    ...webpackConfig.devServer,
    proxy
  }, compiler);

  server.startCallback(() => {
    const watcher = chokidar.watch('./proxyConfig.js').on('change', () => {
      console.log("checked dev-server proxy changes, restarting server");
      server.stopCallback(() => {
        watcher.close();
        createServer();
      });
    });
  });
}

createServer();
