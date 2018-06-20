const axios = require("axios");
const actions = require("./actions");
const moment = require("moment");

//Set header for the request
axios.defaults.headers.post["Content-Type"] = "application/json";

//Define post request for sending messages
function sendFacebookMessage(data) {
  const url = "https://graph.facebook.com/v2.6/me/messages?access_token=EAAGSikKKJqwBAFsNqmG0zWGSsP1ZBqfKHQ984pcZAR5nwv8AHCXNav5AFQSs4YOShZAEfkJR1vEZABTD6QuWN2wKwuQxnDU6V7TYBX9x9ApPoZBSpqbTZAAOabQg4HmsTIOrZBKjZBMZChj0RRJKZAH3ogDTZBZCXwYJjlIAFNEmTEYmlZAnZCwAKOtf1v";
  axios
    .post(url, data)
    .then(response => console.log('Message sent back! ' + data.message.text))
    .catch(error => console.log(error.message));
}

//Bot class
class Samanta {
  constructor() {
    this.postData = {
      messaging_type: "RESPONSE",
      recipient: {
        id: "1687230281331060"
      },
      message: {
        text: ''
      }
    };
  }

  //Answer with facebook message depending on user wish
  answer(text, senderId) {
    //Set sender id
    this.postData.recipient.id = senderId;
    //Say Hello
    const formattedText = text.toLowerCase().trim().replace(/\s\s+/g, ' ');
    if (actions.HELLO.indexOf(formattedText) >= 0) {
      this.postData.message.text = 'Witaj';
      sendFacebookMessage(this.postData);
    }
    //Get Date
    else if (actions.DATE.indexOf(formattedText) >= 0) {
      this.postData.message.text = moment().format('MMMM Do YYYY, h:mm:ss a');
      sendFacebookMessage(this.postData);
    }
    //Wrong command
    else {
      this.postData.message.text = 'Nie rozumiem :(';
      sendFacebookMessage(this.postData);
    }
  }
}

module.exports = Samanta;
