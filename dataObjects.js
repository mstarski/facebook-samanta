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
    recipient:{
      id:""
    },
    message:{
      attachment:{
        type:"template",
        payload:{
          template_type:"button",
          text:"Try the URL button!",
          buttons:[
            {
              type:"web_url",
              url:"https://www.messenger.com/",
              title:"URL Button",
              webview_height_ratio: "full"
            }
          ]
        }
      }
    }
  }
};
