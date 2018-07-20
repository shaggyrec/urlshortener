exports.createHandler =  (method) => {
	return new Handler(method);
}

Handler = function(method) {
	this.process = async (req, res) => {
		let params = null;
		if (req.method == 'POST') {
			params = await new Promise((resolve, reject) => {
				let jsonString = '';
				req.on('data', (data) => {
					jsonString += data;
				});
				req.on('end', () => {
					resolve(JSON.parse(jsonString));
				});
			});
		}
		return method.apply(this, [req, res, params]);
	}
}