const axios = require("axios");
const cheerio = require("cheerio");
const zditm_ids = require("../definitions/zditm_ids");

function zditm_scrap(stop_name, line_number) {
	const stopId = zditm_ids.stops_ids[stop_name][0];
	const lineId = zditm_ids.line_ids[line_number];

	axios
		.get(
			`https://www.zditm.szczecin.pl/pasazer/rozklady-jazdy,tabliczka,${lineId},${stopId}`
		)
		.then(response => {
			console.log(response.data);
			const $ = cheerio.load(response.data, {
				normalizeWhitespace: true,
			});
			const direction = $("p")
				.eq(6)
				.text();
			const departure = $("#najkursxhr").text();
			return `${direction} \n ${departure}`;
		})
		.then(result => result);
}

module.exports = props => {
	const params = props.replace(/\s/g, "");
	console.log(params.substring(3, 6));

	const line = params.substring(3, 6);

	if (isNaN(parseInt(line))) {
		return "Podany numer linii jest błędny!";
	}

	if (params.indexOf("sow") !== -1) {
		return zditm_scrap("Sowinskiego", line);
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
