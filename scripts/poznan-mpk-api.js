const axios = require("axios");
const qs = require("qs");

async function ztm_quick_look(stop, line) {
	const data = await axios
		.get(
			`0.0.0.0:4567/api/quick_look?${qs.stringify({
				stop,
				line,
			})}`
		)
		.catch(e => console.error(e));
	console.log(data);
}

async function ztm_get_routes(from, to) {
	const data = await axios
		.get(
			`0.0.0.0:4567/api/get_routes?${qs.stringify({
				from,
				to,
			})}`
		)
		.catch(e => console.error(e));
	console.log(data);
}

module.exports = { ztm_get_routes, ztm_quick_look };
