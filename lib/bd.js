const file = require('./file');
const shortener = require('./shortener');
const bdPath = __dirname + '/../_bd/urls.json'

async function get(url = null) {
	let urls = await file.read(bdPath);
	urls = JSON.parse(urls);
	if(url && urls.data.indexOf(url) !== -1){
		const index = urls.data.indexOf(url);
		return {
            url,
            code:shortener.encode(index)
        }
	}else if(!url){
		return urls.data
	}
};

async function getUrlByCode(code) {
    const index = shortener.decode(code);
    let urls = await file.read(bdPath);
    urls = JSON.parse(urls);
    return urls.data[index];
}

async function insert(url) {
	const existsUrl = await get(url)
	if(existsUrl){
		return existsUrl.code;
	}
    let urls = await get();
	const urlCode = shortener.encode(urls.length);
	urls.push(url);
	file.write(bdPath,JSON.stringify({data:urls}));
	return urlCode;
};

module.exports = {
	get,
	insert,
    getUrlByCode
}