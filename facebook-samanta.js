#!/usr/bin/node
const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const router = express.Router();

const facebook = require("./webhooks/facebook")(router);
const github = require("./webhooks/github")(router);

console.log(facebook, github);

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
