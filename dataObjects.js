module.exports = {
    postDataText: {
        messaging_type: "RESPONSE",
        recipient: {
          id: ""
        },
        message: {
          text: ''
        }
      },
      postDataImg: {
        messaging_type: "RESPONSE",
        recipient:{
          id:""
        },
        message:{
          attachment:{
            type:"image", 
            payload:{
              url:"", 
              is_reusable:true
            }
          }
        }
      }
}