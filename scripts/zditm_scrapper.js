const axios = require("axios");
const cheerio = require("cheerio");

module.exports = props => {
	const params = props.replace(/\s/g, "");
	console.log(params);
	axios
		.get("https://www.zditm.szczecin.pl/pasazer/rozklady-jazdy,linia,9")
		.then(response => {
			const $ = cheerio.load(response.data);
			console.log($("tbody > tr").text());
		})
		.catch(error => {
			console.log(error);
		});
};
