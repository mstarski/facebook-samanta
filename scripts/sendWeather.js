module.exports = (senderId, lat, long, samanta) => {
	samanta.postTextMessage.recipient.id = senderId;
	axios
		.get(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=f022880c42f02c49e961189f1b0bcdad&lang=pl`
		)
		.then(response => {
			console.log(response.data);
			const location = response.data.name;
			const weather = response.data.weather[0].description;
			const temp = (response.data.main.temp - 273.16).toFixed(0);
			const pressure = response.data.main.pressure;
			const humidity = response.data.main.humidity;
			const tempMin = (response.data.main.temp_min - 273.16).toFixed(0);
			const tempMax = (response.data.main.temp_max - 273.16).toFixed(0);
			samanta.postTextMessage.message.text = `W ${location} jest obecnie ${weather}
            Temperatura: ${temp} stopni
            Ciśnienie: ${pressure}
            Wiglgotność: ${humidity}
            Temperatura minimalna: ${tempMin} stopni
            Temperatura maksymalna: ${tempMax} stopni`;
			samanta.submit(samanta.postTextMessage);
		})
		.catch(error => console.log(error));
};
