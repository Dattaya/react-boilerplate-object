/* eslint-disable global-require */

module.exports = (app) => {
  const httpProxy = require('http-proxy');
  const targetUrl = 'http://localhost:8080';
  const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: false,
  });
  app.use('/graphql', (req, res) => {
    proxy.web(req, res, { target: targetUrl });
  });
};
