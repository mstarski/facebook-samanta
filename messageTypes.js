module.exports = {
  markedSeen: {
    recipient: {
      id: "<PSID>"
    },
    sender_action: "mark_seen"
  },
  //------------------------------
  typingOn: {
    recipient: {
      id: "<PSID>"
    },
    sender_action: "typing_on"
  },
  //------------------------------
  typingOff: {
    recipient: {
      id: "<PSID>"
    },
    sender_action: "typing_off"
  },
  //------------------------------
  textMessage: {
    messaging_type: "RESPONSE",
    recipient: {
      id: "<PSID>"
    },
    message: {
      text: "hello, world!"
    }
  },
  //------------------------------
  attachmentMessage: {
    "recipient":{
      "id":"<PSID>"
    },
    "message":{
      "attachment":{
        "type":"image", 
        "payload":{
          "url":"http://www.messenger-rocks.com/image.jpg", 
          "is_reusable":true
        }
      }
    }
  }
};
