const sendWeather = require("../scripts/sendWeather");

//Webhook payload handlers

class Response {
	constructor(condition, handler, args) {
		this.condition = condition;
		this.handler = handler;
		this.args = args;
	}
}

module.exports = function(Samanta, senderId, text = null, attachments = null) {
	return [
		{
			condition: text,
			args: [text, senderId],
			handler: Samanta.sendFacebookMessage,
		},
		{
			condition: attachments && attachments[0].payload.url,
			args: [senderId],
			handler: Samanta.sendSticker,
		},
		{
			condition: attachments && attachments[0].type === "location",
			args: [
				senderId,
				attachments[0].payload.coordinates.lat,
				attachments[0].payload.coordinates.long,
				Samanta,
			],
			handler: sendWeather,
		},
		// This has to be the last element to ensure that this will be called only
		// when no other condition is fullfilled
		{
			condition: true,
			args: [senderId],
			handler: Samanta.messageUnknown,
		},
	];
};
