module.exports = {
  postDataText: {
    messaging_type: "RESPONSE",
    recipient: {
      id: ""
    },
    message: {
      text: ""
    }
  },
  postDataImg: {
    messaging_type: "RESPONSE",
    recipient: {
      id: ""
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: "",
          is_reusable: true
        }
      }
    }
  },
  postDataLocalization: {
    recipient: {
      id: "<PSID>"
    },
    message: {
      text: "Here is a quick reply!",
      quick_replies: [
        {
          content_type: "text",
          title: "Search",
          payload: "<POSTBACK_PAYLOAD>",
          image_url: "http://example.com/img/red.png"
        },
        {
          content_type: "location"
        }
      ]
    }
  }
};
