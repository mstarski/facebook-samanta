const actions = require("../definitions/actions");
const MatrixReduce = require("../scripts/sam-mreducer");

const mathInvokers = (Samanta, formattedText) => ({
	MATRIX: {
		condition: actions.MATRIX.indexOf(formattedText.substring(0, 7)) >= 0,
		handler: () => {
			Samanta.postTextMessage.recipient.id = senderId;

			const args = formattedText.substring(7).trim();
			const result = MatrixReduce(args);
			if (!result) {
				Samanta.postTextMessage.message.text = "Błędne dane";
			}
			Samanta.postTextMessage.message.text = JSON.stringify(result);
			Samanta.submit(Samanta.postTextMessage);
		},
	},
});

module.exports = mathInvokers;
