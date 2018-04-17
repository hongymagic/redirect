HTTP 301 and 302 redirects made easy. Deploy it manually, via now.sh, via
docker, via kubernetes or however you like it.

Application is configured via environment variables. And supports passing query
strings.

#### One image, different configurations

```
REDIRECT_URL:   (required) redirect URL
PORT:           (default: 80) port to start listening on
STATUS:         (default: 301) HTTP redirect status code
IGNORED_AGENTS: (default: []) comma separated list of user-agents to ignore
```

#### Running natively using Node.js

```
REDIRECT_URL=https://hon.gy PORT=3000 node server.js
==> Serving on 3000 redirecting to https://hon.gy/ with 301
```

#### Running on Zeit Now

```
now -e REDIRECT_URL=https://hon.gy/ hongymagic/redirect
```

#### Running via docker

```
docker run \
  -p 3000:3000
  --env PORT=3000
  --env REDIRECT_URL=https://hon.gy/
  --env STATUS=302
  --env IGNORED_AGENTS="GoogleHC,kube-probe"
  hongymagic/redirect:latest
==> Serving on 3000 redirecting to https://hon.gy/ with 302

curl -I http://localhost:3000/?utm_campaign=test
HTTP/1.1 302 Found
Location: https://hon.gy/?utm_campaign=test
Date: Tue, 17 Apr 2018 00:29:28 GMT
Connection: keep-alive

curl -I http://localhost:3000/?utm_campaign=test -H "User-Agent: GoogleHC/v1.0"
HTTP/1.1 200 OK
Date: Tue, 17 Apr 2018 00:30:08 GMT
Connection: keep-alive
```
