'use strict';
const axios = require("axios");
const apikey = '827c2fe476704a54b79180025191002';

const getWeather = (location, nbDays) => {
	return new Promise(async (resolve, reject) => {
		try {
			const weatehrConditions = await axios.get(
			"http://api.apixu.com/v1/forecast.json",
			{
				params: {
					key: apikey,
					q: location,
					days: nbDays
				}
			});
			
			resolve(weatehrConditions.data)
			
		}
		catch(error){
			reject(error);
		}
	});
}

module.exports = getWeather;