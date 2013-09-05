
exports.generatePassword = function(firstName, lastName , empId) {
	var randomNumber, randomText, possibleText;
	if(!empId) empId = Math.floor(Math.random()*1000);
	randomNumber = Math.floor(Math.random()*empId);

	possibleText = firstName +""+lastName;
	randomText=  "";
	for( var i=0; i < 5; i++ )
		randomText += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
	return randomText+""+randomNumber;
};