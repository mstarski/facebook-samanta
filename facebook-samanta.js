#!/usr/bin/node
const app = require("express")();
const http = require("http").Server(app);
const bodyParser = require("body-parser");

const facebook = require("./webhooks/facebook");
const github = require("./webhooks/github");

//Middleware
app.use(bodyParser.json());

//Webhooks
app.use("/facebook", facebook);
app.use("/github", github);


// Get will trigger Samanta's docs
app.get("/", (req, res) => {
	res.send("Samanta - a facebook messenger bot");
});

http.listen(
	process.env.PORT || 8080,
	console.log(`Samanta running on port ${process.env.PORT || 8080}`)
);
