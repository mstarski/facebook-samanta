const axios = require("axios");
const qs = require("qs");
const capitalize = require("../utils/capitalize");

async function ztm_quick_look(stop, line) {
	const { data } = await axios
		.get(
			`https://hanabi.sealcode.org/poznan-mpk-api/api/quick_look?${qs.stringify(
				{
					stop,
					line,
				}
			)}`
		)
		.catch(e => console.error(e));

	let message = `Linia: ${data[0].line}\n`;
	for (const arrival of data) {
		message += `*Kierunek:${arrival.final_destination}*\n ${arrival.hour}:${
			arrival.minutes
		} ${
			arrival.is_today ? "" : `(${arrival.day})`
		}\n====================\n`;
	}
	return message;
}

async function ztm_get_routes(from, to) {
	let response = "";
	let route_index = 1;
	const { data } = await axios
		.get(
			`https://hanabi.sealcode.org/poznan-mpk-api/api/get_routes?${qs.stringify(
				{
					from,
					to,
				}
			)}`
		)
		.catch(e => console.error(e));
	for (let route of data) {
		let route_total_journey_time = 0;
		const route_info = route
			.map((action, index) => {
				const {
					day,
					minutes,
					stop_name,
					final_destination,
					hour,
					is_today,
					journey_time,
					dest,
					line,
				} = action;
				route_total_journey_time += journey_time;
				return `\nZ przystanku *${stop_name}*, wsiądź w linię ${line} o godzinie ${hour}:${minutes} ${
					is_today ? "" : day
				}w kierunku ${final_destination} i wysiądź na przystanku *${capitalize(
					dest
				)}*\n${index !== route.length - 1 ? "=>" : ""} `;
			})
			.join("\n");
		response += `TRASA #${route_index + 1}${route_info}`;
		response += `Całkowity czas jazdy: ${route_total_journey_time.toString()} min, Liczba przesiadek: ${route.length -
			1}\n=============================\n`;
		route_index++;
	}
	return response;
}

module.exports = { ztm_get_routes, ztm_quick_look };
