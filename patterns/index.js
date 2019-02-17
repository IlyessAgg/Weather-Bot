const patternDict = [{
	pattern : "\\b(?<greeting>Hi|Hello|Hey|What's up)\\b",
	intent : 'Hello'
	},{
	pattern :'\\b(bye|exit)\\b',
	intent : 'Exit'
	},{
	pattern :'like\\sin\\s\\b(?<city>.+)',
	intent : 'CurrentWeather'
	},{
	pattern:"\\b(?<weather>hot|cold|rain|rainy|sunny|snow|thunder|drizzle)\\b\\s\\b(?<time>the\\sday\\safter\\stomorrow|tomorrow|today)\\sin\\s\\b(?<city>[a-z]+[a-z]+?)$",
	intent:'WeatherForecast'
	},{
	pattern:'\\b(?<weather>hot|cold|rain|rainy|sunny|snow|thunder|drizzle)\\b\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)\\b(?<time>the\\sday\\safter\\stomorrow|tomorrow|today)$',
	intent: 'WeatherForecast'
}];

module.exports = patternDict ;