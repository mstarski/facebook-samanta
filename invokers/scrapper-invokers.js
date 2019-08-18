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
		handler: () => {
			//Get arguments to parse
			const [_ztm, cmd, arg1, arg2] = formattedText
				.replace(/\s\s+/g, " ")
				.split(" ");
			if (cmd === "o") {
				const response = ztm.ztm_quick_look(arg1, arg2, Samanta);
				Samanta.postTextMessage.recipient.id = senderId;
				Samanta.postTextMessage.message.text = response;
				Samanta.submit(Samanta.postTextMessage);
			} else if (cmd === "t") {
				return ztm.ztm_get_routes(arg1, arg2, Samanta);
			}
		},
	},
});

module.exports = scrapperInvokers;
