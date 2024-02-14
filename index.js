var http = require('http');
var url = require('url');
var fs = require('fs');

let page404
fs.readFile('./404.html', (err, data) => {
	page404 = data;
});

http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	var filename = "." + q.pathname;
	console.log(filename)
	fs.readFile(filename, function (err, data) {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.write(page404)
			return res.end()
		}
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(data);
		return res.end();
	});
}).listen(8080);
