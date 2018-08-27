const axios = require("axios");
const cheerio = require("cheerio");
const zditm_ids = require("../definitions/zditm_ids");

function zditm_scrap(stop_name, line_number, self, senderId) {
	const stopId = zditm_ids.stops_ids[stop_name][0];
	const lineId = zditm_ids.line_ids[line_number];

	axios
		.get(
			`https://www.zditm.szczecin.pl/pasazer/rozklady-jazdy,tabliczka,${lineId},${stopId}`
		)
		.then(response => {
			const $ = cheerio.load(response.data, {
				normalizeWhitespace: true,
			});
			const direction = $("p")
				.eq(6)
				.text();
			const departure = $("#najkursxhr").text();
			console.log(`${direction} \n${departure}`);
			return `${direction} \n${departure}`;
		})
		.then(result => {
			self.postTextMessage.message.text = result;
			self.postTextMessage.recipient.id = senderId;
			self.submit(self.postTextMessage);
		});
}

module.exports = (props, self, senderId) => {
	const params = props.replace(/\s/g, "");
	console.log(params.substring(3, 6));

	const line = params.substring(3, 6);

	if (isNaN(parseInt(line))) {
		return "Podany numer linii jest błędny!";
	}

	console.log(params.substring(0, 3));

	switch (params.substring(0, 3)) {
		case "sow":
			zditm_scrap("Sowinskiego", line, self, senderId);
			break;
		case "swo":
			zditm_scrap("Swolezerow", line, self, senderId);
			break;
		case "dgl":
			zditm_scrap("Dworzec Glowny", line, self, senderId);
			break;
		case "bpo":
			zditm_scrap("Brama Portowa", line, self, senderId);
			break;
		case "rod":
			zditm_scrap("Plac Rodla", line, self, senderId);
			break;
		default:
			return "Nie wykryto połączenia";
	}
};
