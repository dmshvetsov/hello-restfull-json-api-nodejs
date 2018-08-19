const url = require('url');

function helloHandler(callback) {
  const payload = { message: 'Hello!' };
  callback({ payload, head: 200 });
}

function notFoundHandler(callback) {
  const payload = { message: 'Not found' };
  callback({ payload, head: 404 });
}

const router = {
  hello: helloHandler
};

function requestListener(req, res) {
  const { pathname: path } = url.parse(req.url, true);
  const reqPath  = path.replace(/^\/+|\/+$/g, '');
  const handler = router[reqPath] || notFoundHandler;

  handler(({ head, payload }) => {
    head = head || 200;
    payload = payload || {};
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(head);
    res.end(JSON.stringify(payload));
  });
}

module.exports = requestListener;
