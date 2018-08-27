const axios = require("axios");
const cheerio = require("cheerio");
const zditm_ids = require("../definitions/zditm_ids");

function send(message, self, senderId) {
	self.postTextMessage.message.text = message;
	self.postTextMessage.recipient.id = senderId;
	self.submit(self.postTextMessage);
}

function zditm_scrap(stop_name, line_number, self, senderId) {
	const stopId = zditm_ids.stops_ids[stop_name];
	const lineId = zditm_ids.line_ids[line_number];

	function getSchedule(index) {
		return axios
			.get(
				`https://www.zditm.szczecin.pl/pasazer/rozklady-jazdy,tabliczka,${lineId},${
					stopId[index]
				}`
			)
			.then(response => {
				const $ = cheerio.load(response.data, {
					normalizeWhitespace: true,
				});
				const direction = $("p")
					.eq(6)
					.text();
				const departure = $("#najkursxhr").text();
				return `-------------------\n*${direction}*\n*${departure}*\n-------------------`;
			})
			.catch(error => {
				return "Nie wykryto połączenia :(";
			});
	}

	axios.all([getSchedule(0), getSchedule(1)]).then(
		axios.spread((firstStop, secondStop) => {
			const message = `${firstStop}\n${secondStop}`;
			send(message, self, senderId);
		})
	);
}

module.exports = (props, self, senderId) => {
	const params = props.replace(/\s/g, "");

	console.log(params.length);

	if (params.length === 0) {
		const message = JSON.stringify(zditm_ids.help, null, 2);
		send(`Lista przystanków:\n${message}`, self, senderId);
	}

	const line = params.substring(3, 6);

	if (isNaN(parseInt(line))) {
		send("Podany numer linii jest błędny!", self, senderId);
	}

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
			send("Nie wykryto połączenia :)", self, senderId);
	}
};
