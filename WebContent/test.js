document.querySelector("#test-parse").addEventListener("click", function() {
	fetch("test.ical")
	.then(function(res){
		return res.text();
	}).then(function(text){
		defaultjs.ical.ICalendar.parse(text).then(console.log);
	});	
});
