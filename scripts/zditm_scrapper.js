const axios = require("axios");

module.exports = props => {
    const params = props.replace(/\s/g, "");
    console.log(params);
	axios
		.get("https://www.zditm.szczecin.pl/pasazer/rozklady-jazdy,linia,9")
		.then(response => {
			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});
};
