const axios = require("axios");

axios.defaults.headers.post["Content-Type"] = "application/json";

class Samanta {
  constructor() {
    this.HELLO = [
      "czesc",
      "cześć",
      "cześc",
      "czesć",
      "witaj",
      "hi",
      "hello",
      "hello there",
      "hey"
    ];
  }

  answer(text) {
    const postData = {
      messaging_type: "text",
      recipient: {
        id: "1687230281331060"
      },
      message: {
        text: "hello, world!"
      }
    };
    const url =
      "https://graph.facebook.com/v2.6/me/messages?access_token=EAAGSikKKJqwBAFsNqmG0zWGSsP1ZBqfKHQ984pcZAR5nwv8AHCXNav5AFQSs4YOShZAEfkJR1vEZABTD6QuWN2wKwuQxnDU6V7TYBX9x9ApPoZBSpqbTZAAOabQg4HmsTIOrZBKjZBMZChj0RRJKZAH3ogDTZBZCXwYJjlIAFNEmTEYmlZAnZCwAKOtf1v";
    axios
      .post(url, postData)
      .then(response => {
        console.log(response.json());

      })
      .catch(error => console.log(error.message));
  }
}

module.exports = Samanta;
