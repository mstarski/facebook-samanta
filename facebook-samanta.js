#!/usr/bin/node
const app = require("express")();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const Samanta = require("./Samanta/Samanta");
const credentials = require("./utils/get-credentials");

const facebook = require("./webhooks/facebook");
const github = require("./webhooks/github");

//Middleware
app.use(bodyParser.json());

//Webhooks
app.use("/facebook", facebook);
app.use("/github", github);

//Create Samanta Object that will response to user requests
const Sam = new Samanta(credentials["page-access-token"]);

// Get will trigger Samanta's docs
app.get("/", (req, res) => {
	res.send("Samanta - a facebook messenger bot");
});

http.listen(
	process.env.PORT || 8080,
	console.log(`Samanta running on port ${process.env.PORT || 8080}`)
);
