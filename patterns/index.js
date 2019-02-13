const patternDict = [{
	pattern : "\\b(?<greeting>Hi|Hello|Hey|What's up)\\b",
	intent : 'Hello'
	},{
	pattern :'\\b(bye|exit)\\b',
	intent : 'Exit'
	},{
	pattern :'in\\s\\b(?<city>.+)',
	intent : 'CurrentWeather'
}];

module.exports = patternDict ;