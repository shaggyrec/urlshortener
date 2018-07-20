function makeUrlShort(form){
	var data = {}
	
	for(var i=0; i < form.elements.length; i++) {
		var element = form.elements[i];
		if (element.value) {
			data[element.name] = element.value;
		}
	}
	var requestOpts = {
		url: form.action,
		data: data,
		success:renderShortenResult,
		error: formError
	}
	ajaxPost(requestOpts);
}
function renderShortenResult(data) {
	var link = location.origin + '/' + data;
	result.innerHTML = link;
}
function formError() {
	alert('error! Try later');
}
function ajaxPost(opts) {
	var json = JSON.stringify(opts.data);
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', opts.url, true);
	
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	
	xhr.onreadystatechange = function() {
		if (this.readyState != 4) return;
		if(this.status !== 200){
			opts.error();
			return
		}
		opts.success(this.responseText);
	}
	
	xhr.send(json);
}