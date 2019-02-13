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

async function getWeather(city){
	try{
		let result = await weather(city);
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
					var weath = await getWeather(cb.entities.city);
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
				
			default: {
				console.log(" I'm sorry I didn't understand that.");
				rl.prompt();
				break;
			}
		}
});

