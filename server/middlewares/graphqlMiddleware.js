/* eslint-disable global-require */
const httpProxy = require('http-proxy');

const logger = require('../logger');

module.exports = (app, server) => {
  const targetUrl = 'http://localhost:8080';
  const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: true,
    changeOrigin: true,
  });

  app.use('/graphql', (req, res) => proxy.web(req, res, { target: targetUrl }));

  // Listen to the `upgrade` event and proxy the WebSocket requests as well.
  server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head, { target: targetUrl }));

  proxy.on('error', (error, req, res) => {
    logger.error(error);

    res.end(JSON.stringify({ error: 'Error', code: 178 })); // random error code that represents proxy errors
  });
};
