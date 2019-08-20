const zditm_scrapper = require("../scripts/zditm_scrapper");
const ztm = require("../scripts/poznan-mpk-api");
const actions = require("../definitions/actions");

const scrapperInvokers = (Samanta, formattedText, senderId) => ({
	ZDITM: {
		condition: actions.ZDITM.indexOf(formattedText.substring(0, 5)) >= 0,
		handler: () => {
			zditm_scrapper(formattedText.substring(5), Samanta, senderId);
		},
	},
	ZTM: {
		condition: actions.ZTM.indexOf(formattedText.substring(0, 3)) >= 0,
		handler: async () => {
			//Get arguments to parse
			let args = formattedText.substring(3).split(",");
			args = args.map(arg => arg.trim());
			const [flag, arg1, arg2] = args;

			console.log(args);

			if (flag === "o") {
				const response = await ztm.ztm_quick_look(arg1, arg2, Samanta);
			} else if (flag === "t") {
				const response = await ztm.ztm_get_routes(arg1, arg2, Samanta);
			}

			console.log(response);
			Samanta.postTextMessage.recipient.id = senderId;
			Samanta.postTextMessage.message.text = response;
			Samanta.submit(Samanta.postTextMessage);
		},
	},
});

module.exports = scrapperInvokers;
