const { format, parse } = require('url');
const { createServer } = require('http');
const invariant = require('assert').strict.ok;

const REDIRECT_URL = format(process.env.REDIRECT_URL);
const STATUS = parseInt(process.env.STATUS, 10) || 301;
const PORT = parseInt(process.env.PORT, 10) || 80;
const IGNORED_AGENTS = process.env.IGNORED_AGENTS ? process.env.IGNORED_AGENTS.split(',') : [];

invariant(REDIRECT_URL, 'REDIRECT_URL environment variable is missing');
invariant(REDIRECT_URL.search(/[\?=]/) === -1, 'REDIRECT_URL cannot contain any querystring or fragments');

const isIgnored = headers => {
  const userAgent = headers['user-agent'];

  if (!userAgent) {
    return false;
  }

  return IGNORED_AGENTS.some(agent => userAgent.toLowerCase().includes(agent.toLowerCase()));
};

createServer((req, res) => {
  const url = parse(req.url);
  const Location = `${REDIRECT_URL}${url.search || ''}`;
  const skip = isIgnored(req.headers);

  if (skip) {
    res.statusCode = 200;
    res.end();
  } else {
    res.writeHead(STATUS, { Location });
    res.end();
  }

}).listen(PORT);

console.log(`==> Serving on ${PORT} redirecting to ${REDIRECT_URL} with ${STATUS}`);
