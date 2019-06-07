const actions = require("../definitions/actions");
const { exec } = require("child_process");

const systemInvokers = (Samanta, formattedText) => ({
	LS: {
		condition: actions.LS.indexOf(formattedText) >= 0,
		handler: () => {
			exec("ls -al", (err, stdout, stderr) => {
				if (err) {
					console.log(stderr);
					return;
				}
				Samanta.postTextMessage.recipient.id = senderId;
				Samanta.postTextMessage.message.text = stdout;
				Samanta.submit(Samanta.postTextMessage);
			});
		},
	},
});

module.exports = systemInvokers;
