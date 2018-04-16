Redirect with ease

```
docker run \
	-p 3000:3000
	--env PORT=3000
	--env REDIRECT_URL=https://hon.gy/
	--env STATUS=302
	hongymagic/redirect:latest

curl -I http://localhost:3000/?utm_campaign=hongy
```
