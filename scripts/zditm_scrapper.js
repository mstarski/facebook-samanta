const axios = require("axios");
const cheerio = require("cheerio");

const stopsIds = {
	Sowinskiego: 367,
	Swolezerow: 301,
	"Dworzec Glowny": 344,
	"Brama Portowa": 29,
	"Plac Rodla": 65,
};

function getSchedule(stop_name, line) {}

module.exports = props => {
	const params = props.replace(/\s/g, "");
	let request = new Object();
	console.log(params.substring(4, 6));

	if (typeof params.substring(4, 6) !== "number") {
		return "Podany numer linii jest błędny!";
	}

	if (params.indexOf("sow") !== -1) {
		return "Kusocinskiego";
	}
	if (params.indexOf("swo") !== -1) {
		return "Swolezerow";
	}
	if (params.indexOf("dgl") !== -1) {
		return "Dworzec Glowny";
	}
	if (params.indexOf("bpo") !== -1) {
		return "Brama Portowa";
	}
	if (params.indexOf("rod") !== -1) {
		return "Plac Rodla";
	}
	return "Nie wykryto połączenia";
};
