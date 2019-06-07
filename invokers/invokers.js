const conversationInvokers = require("./conversation-invokers");
const mathInvokers = require("./math-invokers");
const outsideInvokers = require("./outside-invokers");
const scrapperInvokers = require("./scrapper-invokers");
const systemInvokers = require("./system-invokers");

module.exports = (Samanta, formattedText, senderId) => ({
	...conversationInvokers(Samanta, formattedText, senderId),
	...mathInvokers(Samanta, formattedText, senderId),
	...outsideInvokers(Samanta, formattedText, senderId),
	...scrapperInvokers(Samanta, formattedText, senderId),
	...systemInvokers(Samanta, formattedText, senderId),
});
