module.exports = function(Samanta, text, attachments, senderId) {
	const avaliable_responses = [
		{
			condition: text,
			handler: () => Samanta.sendFacebookMessage(text, senderId),
		},
		{
			condition: attachments[0].payload.url,
			handler: () => Samanta.sendSticker(senderId),
		},
		{
			condition: attachments[0].type === "location",
			handler: () => {
				const lat = attachments[0].payload.coordinates.lat;
				const long = attachments[0].payload.coordinates.long;
				sendWeather(senderId, lat, long, Samanta);
			},
		},
	];

	for (let i = 0; i < avaliable_responses.length; i++) {
		const { condition, handler } = avaliable_responses[i];
		if (condition) {
			return handler();
		}
		Samanta.messageUnknown(senderId);
	}
};
