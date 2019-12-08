document.querySelector("#test-parse").addEventListener("click", function() {
	fetch("test.ical")
	.then(function(res){
		return res.text();
	}).then(function(text){
		console.log(defaultjs.ical.Parser(text));
	});	
});
