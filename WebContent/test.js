
document.querySelector("#test-parse").addEventListener("click", function() {
	fetch("test.ical")
	.then(function(res){
		return res.text();
	}).then(function(aText){			
		document.querySelector("#file").innerText = aText;
	});	
	
	fetch("test.ical")
	.then(function(res){
		return res.ical();
	}).then(function(aCal){			
		document.querySelector("#result").innerText = JSON.stringify(aCal, null, 2); 
	});	
});
