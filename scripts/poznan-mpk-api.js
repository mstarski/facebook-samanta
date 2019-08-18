const axios = require("axios");

async function ztm_quick_look(stop, line) {
	const data = await axios
		.get("127.0.0.1:4567/api/quick_look", {
			stop,
			line,
		})
		.catch(e => console.error(e));
	console.log(data);
}

async function ztm_get_routes(from, to) {
	const data = await axios
		.get("127.0.0.1:4567/api/get_routes", {
			from,
			to,
		})
		.catch(e => console.error(e));
	console.log(data);
}

module.exports = { ztm_get_routes, ztm_quick_look };
