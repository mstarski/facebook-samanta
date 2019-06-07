const { exec } = require("child_process");

module.exports = function(router) {
	router.post("/samanta-webhook", (req, res) => {
		console.log(req.body);
		res.send("Thanks for the push!");
		exec("git pull origin master && pm2 restart facebook-samanta", function(
			error,
			stdout,
			stderr
		) {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		});
	});
	return router;
};
