
const appendToObject = function(aKey, aData, aContext){
	if(typeof aData === "undefined")
		return;
	
	let key = aKey.toLowerCase().trim();	
	if(typeof aContext[key] === "undefined")
		aContext[key] = aData;
	else{		
		let data = aContext[key];
		if(data instanceof Array)
			data.push(aData);
		else
			aContext[key] = [aContext[key], aData];
	}	
};

export default {
	appendToObject: appendToObject
};