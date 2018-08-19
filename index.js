const http = require('http');
const config = require('./config');
const requestListener = require('./request-listener');

const httpServer = http.createServer(requestListener);

httpServer.listen(
  config.httpPort,
  () => console.info(`The server is listening on ${config.httpPort}.`)
);
