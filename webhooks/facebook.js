const credentials = require("../utils/get-credentials");
const sendWeather = require("../scripts/sendWeather");
const Samanta = require("./Samanta/Samanta");

module.exports = function(router) {
	//Create Samanta Object that will response to user requests
	const Sam = new Samanta(credentials["page-access-token"]);

	// Adds support for the webhook's GET method [Verification Purposes]
	router.get("/webhook", (req, res) => {
		// Your verify token. Should be a random string.
		let VERIFY_TOKEN = credentials["verify-token"];

		// Parse the query params
		let mode = req.query["hub.mode"];
		let token = req.query["hub.verify_token"];
		let challenge = req.query["hub.challenge"];

		// Checks if a token and mode is in the query string of the request
		if (mode && token) {
			console.log(token);
			console.log(VERIFY_TOKEN);
			// Checks the mode and token sent is correct
			if (mode === "subscribe" && token === VERIFY_TOKEN) {
				// Responds with the challenge token from the request
				console.log("WEBHOOK_VERIFIED");
				res.status(200).send(challenge);
			} else {
				// Responds with '403 Forbidden' if verify tokens do not match
				res.sendStatus(403);
			}
		}
	});

	// Creates the endpoint for our webhook
	router.post("/webhook", (req, res) => {
		console.log("Im here!");
		// Your verify token. Should be a random string.
		let VERIFY_TOKEN = credentials["verify-token"];

		// Parse the query params
		let mode = req.query["hub.mode"];
		let token = req.query["hub.verify_token"];
		let challenge = req.query["hub.challenge"];

		let body = req.body;

		// Checks this is an event from a page subscription
		if (body.object === "page") {
			// Iterates over each entry - there may be multiple if batched
			body.entry.forEach(function(entry) {
				// Gets the message. entry.messaging is an array, but
				// will only ever contain one message, so we get index 0
				let webhook_event = entry.messaging[0];
				let senderId = webhook_event.sender.id;
				let text = webhook_event.message.text;
				let attachments = webhook_event.message.attachments;

				if (text) {
					console.log(webhook_event);
					console.log(text);

					Sam.sendFacebookMessage(text, senderId);
				} else if (attachments[0].payload.url) {
					Sam.sendSticker(senderId);
				} else if (attachments[0].type === "location") {
					console.log(attachments[0].payload.coordinates);
					const lat = attachments[0].payload.coordinates.lat;
					const long = attachments[0].payload.coordinates.long;
					sendWeather(senderId, lat, long, Sam);
				} else {
					Sam.messageUnknown(senderId);
				}
			});
			// Returns a '200 OK' response to all requests
			res.status(200).send("EVENT_RECEIVED");
		} else {
			// Returns a '404 Not Found' if event is not from a page subscription
			res.sendStatus(404);
		}
	});
};
