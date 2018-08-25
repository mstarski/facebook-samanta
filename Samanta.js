const actions = require('./definitions/actions');
const messageTypes = require('./definitions/messageTypes');
const axios = require('axios');
const timezone = require('moment-timezone');
const moment = require('moment');
const stickerUrls = require('./definitions/stickerUrls');
const { exec } = require('child_process');
const zditm_scrapper = require('./scripts/zditm_scrapper');

class Samanta {
    constructor() {
        moment.locale('pl');
        this.pageAccessToken = 'EAAGSikKKJqwBADZABJwZCzOf99f4aohdd8z8bSUfJlxD3yGNRgo95XGf8GZB27ZBumyRwBZCIZAMwfdNZA1eVDv9shPs3rNLzjNkytVxtetEMNZCrdM3qP8sXX0aS2APdV3C5FAM3T3UjbyIFk9yQL4en12xfTZANQgVVOdjJTklhbRGsZCUiyHuKo';
        this.url = `https://graph.facebook.com/me/messages?access_token=${this.pageAccessToken}`;
        this.postMarkedSeen = messageTypes.markedSeen;
        this.postTypingOn = messageTypes.typingOn;
        this.postTypingOff = messageTypes.typingOff;
        this.postTextMessage = messageTypes.textMessage;
        this.postAttachmentMessage = messageTypes.attachmentMessage;
        this.postLocalizationRequest = messageTypes.localizationRequest;
        this.postList = messageTypes.list;
    }


    submit(data) {
        axios.post(this.url, data)
            .then(() => console.log('Message sent ' + data.message.text ))
            .catch(error => console.log(error))
    }


    sendFacebookMessage(text, senderId){

        const formattedText = text.toLowerCase().trim().replace(/\s+/g, " ");

        if (actions.HELLO.indexOf(formattedText) >= 0) {
            this.postTextMessage.message.text = 'Witaj ^_^';
            this.postTextMessage.recipient.id = senderId;
            this.submit(this.postTextMessage);
        }

        else if (actions.DATE.indexOf(formattedText) >= 0) {
            const date = timezone.tz('Europe/Warsaw').format('MMMM Do YYYY, h:mm:ss a');
            this.postTextMessage.message.text = date;
            this.postTextMessage.recipient.id = senderId;
            this.submit(this.postTextMessage);
        }

        else if (actions.CATS.indexOf(formattedText) >= 0) {
            this.postAttachmentMessage.recipient.id = senderId;
            this.postAttachmentMessage.message.attachment.payload.url = 'http://thecatapi.com/api/images/get?api_key=MzMwMTA4';
            this.submit(this.postAttachmentMessage);
        }

        else if (actions.DOGS.indexOf(formattedText) >= 0) {
            this.postAttachmentMessage.recipient.id = senderId;
            this.postAttachmentMessage.message.attachment.payload.url = 'https://api.thedogapi.com/v1/images/search?format=src&mime_types=image';
            this.submit(this.postAttachmentMessage);
        }

        else if (actions.WEATHER.indexOf(formattedText) >= 0) {
            this.postLocalizationRequest.recipient.id = senderId;
            this.submit(this.postLocalizationRequest);
        }

        else if (actions.LS.indexOf(formattedText) >= 0) {
            exec('ls -al', (err, stdout, stderr) => {
                if(err){
                    console.log(stderr);
                    return;
                }
                this.postTextMessage.recipient.id = senderId;
                this.postTextMessage.message.text = stdout;
                this.submit(this.postTextMessage);
            })
        }
        else if (actions.MATRIX.indexOf(formattedText.substring(0,7)) >= 0) {
            this.postTextMessage.recipient.id = senderId;
            this.postTextMessage.message.text = "Wkrótce ją policze !";
            this.submit(this.postTextMessage);
        }

        else if(actions.ZDITM.indexOf(formattedText.substring(0,5)) >= 0) {
            // this.postTextMessage.recipient.id = senderId;
            // this.postTextMessage.message.text = zditm_scrapper(formattedText.substring(5));
            // this.submit(this.postTextMessage);
            this.postList.recipient.id = senderId;
            this.submit(this.postList);
        }

        else {
            console.log(formattedText);
            this.messageUnknown(senderId);
        }
    }

    messageUnknown(senderId) {
        this.postTextMessage.message.text = 'Nie rozumiem :(';
        this.postTextMessage.recipient.id = senderId;
        this.postAttachmentMessage.recipient.id = senderId;
        this.postAttachmentMessage.message.attachment.payload.url = stickerUrls.messageUnknown.url;
        this.submit(this.postTextMessage);
        this.submit(this.postAttachmentMessage);
    }

    sendSticker(senderId) {
        const randomNumber = Math.floor(Math.random() * stickerUrls.stickers.length);
        this.postAttachmentMessage.recipient.id = senderId;
        this.postAttachmentMessage.message.attachment.payload.url = stickerUrls.stickers[randomNumber].url;
        this.submit(this.postAttachmentMessage);
    }
}

module.exports = Samanta;
