const conversationInvokers = require("./conversation-invokers");
const mathInvokers = require("./math-invokers");
const outsideInvokers = require("./outside-invokers");
const scrapperInvokers = require("./scrapper-invokers");
const systemInvokers = require("./system-invokers");

module.exports = (Samanta, formattedText) => ({
	...conversationInvokers(Samanta, formattedText),
	...mathInvokers(Samanta, formattedText),
	...outsideInvokers(Samanta, formattedText),
	...scrapperInvokers(Samanta, formattedText),
	...systemInvokers(Samanta, formattedText),
});
