const { format, parse } = require('url');
const { createServer } = require('http');
const invariant = require('assert').strict.ok;

const REDIRECT_URL = format(process.env.REDIRECT_URL);
const STATUS = parseInt(process.env.STATUS, 10) || 301;
const PORT = parseInt(process.env.PORT, 10) || 80;

invariant(REDIRECT_URL, 'REDIRECT_URL environment variable is missing');
invariant(REDIRECT_URL.search(/[\?=]/) === -1, 'REDIRECT_URL cannot contain any querystring or fragments');

createServer((req, res) => {
  const url = parse(req.url);
  const Location = `${REDIRECT_URL}${url.search || ''}`;

  console.log(`Redirecting ==> ${req.url} to ${Location}`);

  res.writeHead(STATUS, { Location });
  res.end();
}).listen(PORT);

console.log(`Serving on ${PORT} redirecting to ${REDIRECT_URL} with ${STATUS}`);