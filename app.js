const app = require("express")();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const axios = require("axios");
const Samanta = require("./Samanta");
const sendWeather = require("./scripts/sendWeather");

//Middleware
app.use(bodyParser.json());

//Create Samanta Object that will response to user requests

const Sam = new Samanta();

// Creates the endpoint for our webhook
app.post("/webhook", (req, res) => {
	// Your verify token. Should be a random string.
	let VERIFY_TOKEN =
		"AFD8A4099F482899C738F919D9AA58A985B9C742F4650CF8D68B483FAF5AC084A2D605393A5BFD646B46F5A787155EE8DD233CA15A4882C619BB6912201E567E";

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
				sendWeather(senderId, lat, long);
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

http.listen(process.env.PORT || 8080, console.log("Listening ..."));
