const axios = require("axios");
const cheerio = require("cheerio");
const zditm_ids = require("../definitions/zditm_ids");

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
					.eq(7)
					.text();
				const departure = $("#najkursxhr").text();
				return `-------------------\n*${direction}*\n*${departure}*\n-------------------`;
			})
			.catch(error => {
				return "Nie wykryto połączenia :(";
			});
	}

	axios
		.all([getSchedule(0), getSchedule(1)])
		.then(
			axios.spread((firstStop, secondStop) => {
				console.log(self);
				const message = `${firstStop}\n${secondStop}`;
				self.postTextMessage.message.text = message;
				self.postTextMessage.recipient.id = senderId;
				self.submit(self.postTextMessage);
			})
		)
		.catch(e => console.error("An error occured: " + e));
}

module.exports = (props, self, senderId) => {
	const params = props.replace(/\s/g, "");

	if (params.length === 0) {
		const message = JSON.stringify(zditm_ids.help, null, 2);
		self.postTextMessage.message.text = `Lista przystanków:\n${message}`;
		self.postTextMessage.recipient.id = senderId;
		self.submit(self.postTextMessage);
		return;
	}

	const line = params.substring(3, 6);

	if (isNaN(parseInt(line))) {
		self.postTextMessage.message.text = "Podany numer linii jest błędny!";
		self.postTextMessage.recipient.id = senderId;
		self.submit(self.postTextMessage);
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
		case "pon":
			zditm_scrap("Poniatowskiego", line, self, senderId);
			break;
		case "wys":
			zditm_scrap("Wyszyńskiego", line, self, senderId);
			break;
		case "kas":
			zditm_scrap("Plac Żołnierza Polskiego", line, self, senderId);
			break;
		case "plg":
			zditm_scrap("Plac Grunwaldzki", line, self, senderId);
			break;
		case "ray":
			zditm_scrap("Rayskiego", line, self, senderId);
			break;
		default:
			self.postTextMessage.message.text = "Nie wykryto połączenia :(";
			self.postTextMessage.recipient.id = senderId;
			self.submit(self.postTextMessage);
	}
};
