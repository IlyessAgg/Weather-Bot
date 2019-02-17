'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

const matcher = require('./matcher');
const weather = require('./weather');
const clc = require('cli-color');

async function getWeather(city, nbrDays){
	try{
		let result = await weather(city, nbrDays);
		return result;
	}
	catch(err){
		return 'Error';
	}
}

rl.setPrompt('> ');
rl.prompt();

rl.on('line', reply => {
	var cb = matcher(reply,cb);		
	switch(cb.intent){
		
			case 'Hello':
				console.log(" Hello there! I'm Ilyess's Bot :) What do you want from me ?");
				rl.prompt();
				break;
				
			case 'Exit':
				console.log(" See you another time ;)");
				process.exit(0);
				
			case 'CurrentWeather':
				(async () => {
					var weath = await getWeather(cb.entities.city, 3);
					if(weath != 'Error'){
						console.log(" Here's the current condition in " + cb.entities.city + " : " + weath.current.condition.text);
						
						var temp = weath.current.temp_c;
						if(temp<=6) console.log(" It's pretty"+clc.cyanBright(' cold !')+"Temperatures are around " +clc.cyanBright(temp+" degrees."));
						else if(temp>6 && temp<=15) console.log(" It's moderately "+clc.cyanBright('cold.')+"Temperatures are around "+clc.cyanBright(temp+" degrees."));
						else if(temp>15 && temp<=25) console.log(" It's pretty"+clc.cyan(' cool.')+"Temperatures are around " +clc.cyan(temp+" degrees."));
						else if(temp>25 && temp<=32) console.log(" It's pretty"+clc.yellowBright(' warm.')+"Temperatures are around " +clc.yellowBright(temp+" degrees."));
						else if(temp>32) console.log(" It's super"+clc.redBright(' hot !')+"Temperatures are around " +clc.redBright(temp+" degrees."));
					}
					
					else{console.log(' Error 404 : City Not Found.');}
					rl.prompt();
				})();
				
				break;
			
			case 'WeatherForecast':
				var days = 3;
				if(cb.entities.time == 'tomorrow') days = 1;
				else if(cb.entities.time == 'the day after tomorrow') days = 2;
				(async () => {
					var weath = await getWeather(cb.entities.city, days);
					if(weath != 'Error'){
						// Hot / Cold
						if('hotcold'.includes(cb.entities.weather)){
							var temp = weath.forecast.forecastday[0].day.avgtemp_c;
							if(days == 3) temp = weath.current.temp_c; // If today.
							if(temp < 5 && cb.entities.weather == 'cold') console.log(' Yes');
							else if(temp > 29 && cb.entities.weather == 'hot') console.log(' Yes');
							else console.log(" No, here's the actual temperature : " + temp + ".");
						}
						// Rain / Sun / Thunder etc..
						else{
							var cond = weath.forecast.forecastday[0].day.condition.text;
							if(days == 3) temp = weath.current.condition.text; // If today.
							if(cond.toLowerCase().includes(cb.entities.weather)) console.log(' Yes');
							else console.log(" No, here's the actual condition : " + cond + ".");
						}
					}
					
					else{console.log(' Error 404 : City Not Found.');}
					rl.prompt();
				})();
				
				break;
				
			default: {
				console.log(" I'm sorry I didn't understand that.");
				rl.prompt();
				break;
			}
		}
});

