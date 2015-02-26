$(document).ready(function(){
	$("#search-form").submit(function(event) {
		event.preventDefault();
		search();
	});
	//search();
});

function search(){
	var listing = Handlebars.compile($('#listing').html());
	var query = $("#searchbar").val();
	var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&format=json&srinfo&srlimit=50&callback=?";
	$.getJSON(url, function(data){
		$('#content').html('<h1>Results</h1>');
		//console.log(data);
		for(i = 0; i < data.query.search.length; i++){
			var html = listing({
				title : data.query.search[i].title,
				snippet : data.query.search[i].snippet
			});
			$('#content').append(data.query.search[i].snippet);
			$('#content').append(html);
		}
	});
}
function getWiki(query){
	var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles=" + query + "&prop=revisions&rvprop=content&rvparse&callback=?";
	$('#content').html('');
	$.getJSON(url, function(data){
		var id = first(data.query.pages);
		console.log(data.query.pages[id]);
		$('#content').append("<h1>" + data.query.pages[id].title + "</h2");
		$('#content').append(data.query.pages[id].revisions[0]['*']);
	});
}

function first(obj){
	for(var a in obj) return a;
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// function search(method, url){
// 	var url = "http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=wikipedia&srprop=timestamp&format=json";
// 	var xhr = createCORSRequest('GET', url);
// 	if (!xhr) {
// 	  throw new Error('CORS not supported');
// 	}
// 	xhr.onload = function(){
// 		alert(xhr.responseText);
// 	}
// 	xhr.setRequestHeader('custom-header','http://localhost:3000');
// 	xhr.send();
// }