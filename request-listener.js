const url = require('url');

function helloHandler(callback) {
  const payload = { message: 'Hello!' };
  callback({ payload, head: 200 });
}

function notFoundHandler(callback) {
  const payload = { message: 'Not found' };
  callback({ payload, head: 404 });
}

const post = {
  hello: helloHandler
};

const router = {
  post
};

function getHandler(method, path) {
  const methodHandlers = router[method];
  if (!methodHandlers) {
    return notFoundHandler;
  }
  return methodHandlers[path] || notFoundHandler;
}

function requestListener(req, res) {
  const method = req.method.toLowerCase();
  const { pathname: path } = url.parse(req.url, true);
  const trimPath  = path.replace(/^\/+|\/+$/g, '');
  const handler = getHandler(method, trimPath);

  handler(({ head, payload }) => {
    head = head || 200;
    payload = payload || {};
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(head);
    res.end(JSON.stringify(payload));
  });
}

module.exports = requestListener;
