module.exports = {
	markedSeen: {
		recipient: {
			id: "<PSID>",
		},
		sender_action: "mark_seen",
	},
	//------------------------------
	typingOn: {
		recipient: {
			id: "<PSID>",
		},
		sender_action: "typing_on",
	},
	//------------------------------
	typingOff: {
		recipient: {
			id: "<PSID>",
		},
		sender_action: "typing_off",
	},
	//------------------------------
	textMessage: {
		messaging_type: "RESPONSE",
		recipient: {
			id: "<PSID>",
		},
		message: {
			text: "hello, world!",
		},
	},
	//------------------------------
	attachmentMessage: {
		recipient: {
			id: "<PSID>",
		},
		message: {
			attachment: {
				type: "image",
				payload: {
					url: "http://www.messenger-rocks.com/image.jpg",
					is_reusable: true,
				},
			},
		},
	},
	localizationRequest: {
		recipient: {
			id: "<PSID>",
		},
		message: {
			text: "Gdzie jesteś ?",
			quick_replies: [
				{
					content_type: "location",
				},
			],
		},
	},
	list: {
		recipient: {
			id: "RECIPIENT_ID",
		},
		message: {
			attachment: {
				type: "template",
				payload: {
					template_type: "list",
					top_element_style: "compact",
					elements: [
						{
							title: "Classic T-Shirt Collection",
							subtitle: "See all our colors",
							image_url:
								"https://www.zditm.szczecin.pl/img/min2/1496075437.png",
							buttons: [
								{
									title: "View",
									type: "web_url",
									url:
										"https://peterssendreceiveapp.ngrok.io/collection",
									messenger_extensions: true,
									webview_height_ratio: "tall",
									fallback_url:
										"https://peterssendreceiveapp.ngrok.io/",
								},
							],
						},
					],
					buttons: [
						{
							title: "View More",
							type: "postback",
							payload: "payload",
						},
					],
				},
			},
		},
	},
};
