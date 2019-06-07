const messageTypes = require("../definitions/messageTypes");
const axios = require("axios");
const moment = require("moment");
const stickerUrls = require("./../definitions/stickerUrls");
const invokers = require("../invokers/invokers");

class Samanta {
	constructor(pageAccessToken) {
		moment.locale("pl");
		this.pageAccessToken = pageAccessToken;
		this.url = `https://graph.facebook.com/me/messages?access_token=${
			this.pageAccessToken
		}`;
		this.postMarkedSeen = messageTypes.markedSeen;
		this.postTypingOn = messageTypes.typingOn;
		this.postTypingOff = messageTypes.typingOff;
		this.postTextMessage = messageTypes.textMessage;
		this.postAttachmentMessage = messageTypes.attachmentMessage;
		this.postLocalizationRequest = messageTypes.localizationRequest;
	}

	submit(data) {
		axios
			.post(this.url, data)
			.then(() => console.log("Message sent " + data.message.text || ""))
			.catch(error => console.log(error));
	}

	sendFacebookMessage(text, senderId) {
		const formattedText = text
			.toLowerCase()
			.trim()
			.replace(/\s+/g, " ");
		console.log(formattedText);

		const Invokers = invokers(this, formattedText);
		const keys = Object.keys(Invokers);
		for (let i = 0; i < keys.length; i++) {
			const invoker = Invokers[keys[i]];
			if (invoker.condition) {
				return invoker.handler();
			}
		}
		this.messageUnknown(senderId);
	}

	messageUnknown(senderId) {
		this.postTextMessage.message.text = "Nie rozumiem :(";
		this.postTextMessage.recipient.id = senderId;
		this.postAttachmentMessage.recipient.id = senderId;
		this.postAttachmentMessage.message.attachment.payload.url =
			stickerUrls.messageUnknown.url;
		this.submit(this.postTextMessage);
		this.submit(this.postAttachmentMessage);
	}

	sendSticker(senderId) {
		const randomNumber = Math.floor(
			Math.random() * stickerUrls.stickers.length
		);
		this.postAttachmentMessage.recipient.id = senderId;
		this.postAttachmentMessage.message.attachment.payload.url =
			stickerUrls.stickers[randomNumber].url;
		this.submit(this.postAttachmentMessage);
	}
}

module.exports = Samanta;
