const server = require('./server');

server.listen(server.PORT);
console.log(`==> Serving on ${server.PORT} redirecting to ${server.REDIRECT_URL} with ${server.STATUS}`);
