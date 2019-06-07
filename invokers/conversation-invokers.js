const actions = require("../definitions/actions");
const timezone = require("moment-timezone");

const conversationInvokers = (Samanta, formattedText) => ({
	HELLO: {
		condition: actions.HELLO.indexOf(formattedText) >= 0,
		handler: () => {
			Samanta.postTextMessage.message.text = "Witaj ^_^";
			Samanta.postTextMessage.recipient.id = senderId;
			Samanta.submit(Samanta.postTextMessage);
		},
	},

	DATE: {
		condition: actions.DATE.indexOf(formattedText) >= 0,
		handler: () => {
			const date = timezone
				.tz("Europe/Warsaw")
				.format("MMMM Do YYYY, h:mm:ss a");
			Samanta.postTextMessage.message.text = date;
			Samanta.postTextMessage.recipient.id = senderId;
			Samanta.submit(Samanta.postTextMessage);
		},
	},

	LOVE: {
		condition: actions.LOVE.indexOf(formattedText) >= 0,
		handler: () => {
			if (formattedText === actions.LOVE[3]) {
				Samanta.postTextMessage.recipient.id = senderId;
				Samanta.postTextMessage.message.text =
					"私はもあなたが愛しているよ　＜3";
				Samanta.submit(Samanta.postTextMessage);
				return;
			}

			const answers = [
				"Ja ciebie też <3",
				"Niestety nie odwzajemniam Twojego uczucia, ale zostańmy przyjaciółmi",
				"A weź przestań",
				"Nie wiem co powiedzieć 😱",
				"💁‍",
				"Nie mozemy, to niemoralne",
				"Miłośc względem bota jest nieludzka ...",
			];
			const rand = Math.floor(Math.random() * 7);
			Samanta.postTextMessage.recipient.id = senderId;
			Samanta.postTextMessage.message.text = answers[rand];
			Samanta.submit(Samanta.postTextMessage);
		},
	},
});

module.exports = conversationInvokers;
