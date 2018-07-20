const fs = require('fs');

exports.read = async (filename) => {
	return new Promise((resolve,reject) => {
		const stream = fs.createReadStream(filename);
		let result = '';
		stream.on('data', data => {
			result += data;
			stream.destroy();
		});
		stream.on('close', () => {
			resolve(result);
		});
		stream.on('error', function (err) {
			reject();
		});
	});
}
exports.write = async (filename, data) => {
	return new Promise((resolve,reject) => {
		const stream = fs.createWriteStream(filename);
		stream.write(data);
		stream.end();
		stream.on('close', () => {
			resolve(data);
		});
		stream.on('error', function (err) {
			reject();
		});
	});
}
