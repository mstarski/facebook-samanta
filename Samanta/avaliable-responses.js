module.exports = function(Samanta, text, attachments, senderId) {
	console.log("am i here?");
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

	const action = avaliable_responses.some(response => {
		response.condition ? handler() : null;
	});

	if (!action) Samanta.messageUnknown(senderId);
};
