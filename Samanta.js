import * as answers from "./answerTypes";
import axios from "axios";

class Samanta {

  answer = (text) => {
    switch (text) {
      case answers.HELLO.indexOf(text) !== -1:
      postData = {
        messaging_type: "text",
        recipient: {
          id: "1687230281331060"
        },
        message: {
          text: "hello, world!"
        }
      };
        axios.post('https://graph.facebook.com/v2.6/me/messages?access_token=EAAGSikKKJqwBAFsNqmG0zWGSsP1ZBqfKHQ984pcZAR5nwv8AHCXNav5AFQSs4YOShZAEfkJR1vEZABTD6QuWN2wKwuQxnDU6V7TYBX9x9ApPoZBSpqbTZAAOabQg4HmsTIOrZBKjZBMZChj0RRJKZAH3ogDTZBZCXwYJjlIAFNEmTEYmlZAnZCwAKOtf1v', postData)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
  };
}

export default Samanta;
