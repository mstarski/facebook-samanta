const actions = require('./actions');
const messageTypes = require('./messageTypes');
const axios = require('axios');
const timezone = require('moment-timezone');
const moment = require('moment');
const stickerUrls = require('./stickerUrls');
const { exec } = require('child_process');

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
        this.postLocalizationRequest = messageTypes.localizationRequest;
    }


    submit(data) {
        axios.post(this.url, data)
            .then(response => console.log('Message sent ' + data.message.text ))
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

        else {
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

    sendWeather(senderId, lat, long) {
        this.postTextMessage.recipient.id = senderId;
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=f022880c42f02c49e961189f1b0bcdad&lang=pl`)
            .then(response => {
                console.log(response.data);
                const location = response.data.name;
                const weather = response.data.weather[0].description;
                const temp = (response.data.main.temp-273.16).toFixed(0);
                const pressure = response.data.main.pressure;
                const humidity = response.data.main.humidity;
                const tempMin = (response.data.main.temp_min-273.16).toFixed(0);
                const tempMax = (response.data.main.temp_max-273.16).toFixed(0);
                this.postTextMessage.message.text = `W ${location} jest obecnie ${weather}
                Temperatura: ${temp} stopni
                Ciśnienie: ${pressure}
                Wiglgotność: ${humidity}
                Temperatura minimalna: ${tempMin} stopni
                Temperatura maksymalna: ${tempMax} stopni`
                this.submit(this.postTextMessage);
            })
            .catch(error => console.log(error))
    }
}

module.exports = Samanta;