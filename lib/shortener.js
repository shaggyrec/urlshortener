const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const base = alphabet.length;

module.exports.encode = (id) => {
	id = parseInt(id);
	if (id === 0) {
		return alphabet[0]
	}
	let s = "";
	while (id > 0) {
		s += alphabet[id % base]
		id = parseInt(id / base, 10)
		s.split("").reverse().join("")
	}
	return s;
}

module.exports.decode = (s) => {
    let id = 0;
    for(let c of s) {
        id = id * base + alphabet.indexOf(c);
    }
    return id;
}
