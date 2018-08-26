const axios = require("axios");
const cheerio = require("cheerio");
const zditm_ids = require("../definitions/zditm_ids");

function zditm_scrap(stop_name, line_number) {
	const stopId = zditm_ids.stops_ids[stop_name];
	const line_number = zditm_ids.line_ids[line_number];

	axios
		.get(
			`https://www.zditm.szczecin.pl/pasazer/rozklady-jazdy,tabliczka,${lineId},${stopId}`
		)
		.then(response => {
			const $ = cheerio.load(response.data);
			return (
				$("p")
					.eq(6)
					.text() +
				"\n" +
				$("#najkursxhr").text()
			);
		});
}

module.exports = props => {
	const params = props.replace(/\s/g, "");
	let request = new Object();
	console.log(params.substring(3, 6));

	if (isNaN(parseInt(params.substring(3)))) {
		return "Podany numer linii jest błędny!";
	}

	if (params.indexOf("sow") !== -1) {
		return "Kusocinskiego" + params.substring(3);
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
