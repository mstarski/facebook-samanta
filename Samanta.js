const actions = require('./actions');
const messageTypes = require('./messageTypes');
const axios = require('axios');
const timezone = require('moment-timezone');

class Samanta {
    constructor() {
        moment.locale('pl');
        this.pageAccessToken = 'EAAGSikKKJqwBADZABJwZCzOf99f4aohdd8z8bSUfJlxD3yGNRgo95XGf8GZB27ZBumyRwBZCIZAMwfdNZA1eVDv9shPs3rNLzjNkytVxtetEMNZCrdM3qP8sXX0aS2APdV3C5FAM3T3UjbyIFk9yQL4en12xfTZANQgVVOdjJTklhbRGsZCUiyHuKo';
        this.url = `https://graph.facebook.com/v2.6/me/messages?access_token=${this.pageAccessToken}`;
        this.postMarkedSeen = messageTypes.markedSeen;
        this.postTypingOn = messageTypes.typingOn;
        this.postTypingOff = messageTypes.typingOff;
        this.postTextMessage = messageTypes.textMessage;
        this.postAttachmentMessage = messageTypes.attachmentMessage;
    }


    submit(data) {
        axios.post(this.url, data)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }


    sendFacebookMessage(text, senderId){
        if (actions.HELLO.indexOf(text) >= 0) {
            this.postTextMessage.message.text = 'Witaj ^_^';
            this.postTextMessage.recipient.id = senderId;
            this.submit(this.postTextMessage);
        }

        if (actions.DATE.indexOf(text) >= 0) {
            const date = timezone.tz('Europe/Warsaw').format('MMMM Do YYYY, h:mm:ss a');
            this.postTextMessage.message.text = date;
            this.postTextMessage.recipient.id = senderId;
            this.submit(this.postTextMessage);
        }

        if (actions.CATS.indexOf(text) >= 0) {
            this.postAttachmentMessage.recipient.id = senderId;
            this.postAttachmentMessage.message.attachment.payload.url = 'http://thecatapi.com/api/images/get?api_key=MzMwMTA4';
            this.submit(this.postAttachmentMessage);
        }

        else {
            this.postTextMessage.message.text = 'Nie rozumiem :(';
            this.postTextMessage.recipient.id = senderId;
            this.submit(this.postTextMessage);
        }
    }

}

module.exports = Samanta;