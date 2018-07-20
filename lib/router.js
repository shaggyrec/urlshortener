const handler = require('./handler');
const fs = require('fs');
const parser = require('url');
let handlers = {};

exports.clear = () => {
	handlers = {};
}

exports.register = (url, method) => {
	handlers[url] = handler.createHandler(method);
}

exports.route = (req) => {
	const url = parser.parse(req.url, true);
    let handler = this.missing(req);
	if (!handler) handler = handlers[url.pathname];
    if (!handler && handlers['*']) return handlers['*'];
    if (!handler) handler = this.notFound(req);
	return handler;
}

exports.missing = (req) => {
	const url = parser.parse(req.url, true);
	const path = __dirname + "/../public" + url.pathname;
	try {
		data = fs.readFileSync(path);
		mime = req.headers.accepts || 'text/html';
		return handler.createHandler((req, res) => {
			res.writeHead(200, {'Content-Type': mime});
			res.write(data);
			res.end();
		});
	} catch (e) {
		return;
	}
}

exports.notFound = (req) => {
    const url = parser.parse(req.url, true);
    return handler.createHandler((req, res) => {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write("No route registered for " + url.pathname);
        res.end();
    });
}