const http = require('http');
const router = require('./lib/router');
const parser = require('url');
const file = require('./lib/file');
const bd = require('./lib/bd');
const port = 3000;

router.register('/', async (req, res) => {
	const data = await file.read(__dirname + '/public/index.html');
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.end();
});

router.register('/api/shorten', async (req, res, params) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	const shortUrl = await bd.insert(params.url);
	res.write(shortUrl);
	res.end();
});

router.register('*', async (req, res, params) => {
    const url = parser.parse(req.url, true);
	const urlCode = url.pathname.substr(1);
	const redirectUrl  = await bd.getUrlByCode(urlCode);
	if(redirectUrl){
        res.writeHead(302, {
            'Location': redirectUrl
        });
        res.end();
        return;
	}
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Page not found');
    res.end();
});

const server = http.createServer((req, res) => {
	const handler = router.route(req);
	handler.process(req, res);
});

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err);
	}
	console.log(`server is listening on ${port}`);
});