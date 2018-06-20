const axios = require("axios");
const actions = require("./actions");

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
    this.responseMessage = '';
    this.postData = {
      messaging_type: "RESPONSE",
      recipient: {
        id: "1687230281331060"
      },
      message: {
        text: this.responseMessage
      }
    };
  }

  //Answer with facebook message depending on user wish
  answer(text) {
    const formattedText = text.toLowerCase().trim().replace(/\s\s+/g, ' ');
    if (actions.HELLO.indexOf(formattedText) >= 0) {
      this.responseMessage = 'Witaj';
      sendFacebookMessage(this.postData);
    }
    else if (actions.DATE.indexOf(formattedText) >= 0) {
      this.responseMessage = Date.now().toString();
      sendFacebookMessage(this.postData);
    }
    else {
      this.responseMessage = 'Nie rozumiem :(';
      sendFacebookMessage(this.postData);
    }
  }
}

module.exports = Samanta;
