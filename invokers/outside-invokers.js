const axios = require("axios");
const actions = require("../definitions/actions");

const outsideInvokers = (Samanta, formattedText, senderId) => ({
	CATS: {
		condition: actions.CATS.indexOf(formattedText) >= 0,
		handler: () => {
			Samanta.postAttachmentMessage.recipient.id = senderId;
			Samanta.postAttachmentMessage.message.attachment.payload.url =
				"http://thecatapi.com/api/images/get?api_key=MzMwMTA4";
			Samanta.submit(Samanta.postAttachmentMessage);
		},
	},
	DOGS: {
		condition: actions.DOGS.indexOf(formattedText) >= 0,
		handler: () => {
			Samanta.postAttachmentMessage.recipient.id = senderId;
			Samanta.postAttachmentMessage.message.attachment.payload.url =
				"https://api.thedogapi.com/v1/images/search?format=src&mime_types=image";
			Samanta.submit(Samanta.postAttachmentMessage);
		},
	},
	WEATHER: {
		condition: actions.WEATHER.indexOf(formattedText) >= 0,
		handler: () => {
			Samanta.postLocalizationRequest.recipient.id = senderId;
			Samanta.submit(Samanta.postLocalizationRequest);
		},
	},
	JOKE: {
		condition: actions.JOKE.indexOf(formattedText) >= 0,
		handler: () => {
			axios({
				method: "get",
				headers: { Accept: "application/json" },
				url: "https://icanhazdadjoke.com/",
			}).then(response => {
				Samanta.postTextMessage.recipient.id = senderId;
				Samanta.postTextMessage.message.text = response.data.joke;
				Samanta.submit(Samanta.postTextMessage);
			});
		},
	},
});

module.exports = outsideInvokers;
