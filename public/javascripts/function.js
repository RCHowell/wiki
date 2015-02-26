$(document).ready(function(){
	$("#search-form").submit(function(event) {
		event.preventDefault();
		search();
	});
});

function search(){
	var listing = Handlebars.compile($('#listing').html());
	var query = $("#searchbar").val();
	var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&format=json&srinfo&srlimit=50";
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
	var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles=" + query + "&prop=revisions&rvprop=content&rvparse";
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