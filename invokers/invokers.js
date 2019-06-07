const conversationInvokers = require("./conversation-invokers");
const mathInvokers = require("./math-invokers");
const outsideInvokers = require("./outside-invokers");
const scrapperInvokers = require("./scrapper-invokers");
const systemInvokers = require("./system-invokers");

module.exports = {
	...conversationInvokers,
	...mathInvokers,
	...outsideInvokers,
	...scrapperInvokers,
	...systemInvokers,
};
