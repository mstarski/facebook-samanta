const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const Samanta = require('./Samanta');
const axios = require('axios');
//Middleware
app.use(bodyParser.json());

const Sam = new Samanta();


// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "AFD8A4099F482899C738F919D9AA58A985B9C742F4650CF8D68B483FAF5AC084A2D605393A5BFD646B46F5A787155EE8DD233CA15A4882C619BB6912201E567E"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
 
    let body = req.body;
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        let senderId = webhook_event.sender.id;
        let text = webhook_event.message.text;
        console.log(webhook_event);
        console.log(text);
        const url = "https://graph.facebook.com/v2.6/me/messages?access_token=EAAGSikKKJqwBAFsNqmG0zWGSsP1ZBqfKHQ984pcZAR5nwv8AHCXNav5AFQSs4YOShZAEfkJR1vEZABTD6QuWN2wKwuQxnDU6V7TYBX9x9ApPoZBSpqbTZAAOabQg4HmsTIOrZBKjZBMZChj0RRJKZAH3ogDTZBZCXwYJjlIAFNEmTEYmlZAnZCwAKOtf1v";
        const data =  {
          messaging_type: "RESPONSE",
          recipient: {
            id: senderId
          },
          message: {
            text: "hi"
          }
        };
        axios
          .post(url, data)
          .then(response => console.log('Message sent back! ' + data.message.text))
          .catch(error => console.log(error.message));
        // Sam.answer(text, senderId);
      });
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  });

http.listen(process.env.PORT || 8080, console.log('Listening ...'));