const credentials = require("../utils/get-credentials");

module.exports = function(router) {

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

	return router;
};
