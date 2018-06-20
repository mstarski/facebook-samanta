const axios = require("axios");
const actions = require("./actions");

axios.defaults.headers.post["Content-Type"] = "application/json";

class Samanta {
  constructor() {
    this.postData = {
      messaging_type: "RESPONSE",
      recipient: {
        id: "1687230281331060"
      },
      message: {
        text: "Witaj"
      }
    };
  }

  answer(text) {
    if (actions.HELLO.indexOf(text.toLowerCase()) >= 0) {
      const url = "https://graph.facebook.com/v2.6/me/messages?access_token=EAAGSikKKJqwBAFsNqmG0zWGSsP1ZBqfKHQ984pcZAR5nwv8AHCXNav5AFQSs4YOShZAEfkJR1vEZABTD6QuWN2wKwuQxnDU6V7TYBX9x9ApPoZBSpqbTZAAOabQg4HmsTIOrZBKjZBMZChj0RRJKZAH3ogDTZBZCXwYJjlIAFNEmTEYmlZAnZCwAKOtf1v";
      axios
        .post(url, this.postData)
        .then(response => {
          console.log(response.json());
        })
        .catch(error => console.log(error.message));
    }
  }
}

module.exports = Samanta;
