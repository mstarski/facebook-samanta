const fs = require("fs");

//Get local credentials
let credentials = (function getLocalInfo() {
	return fs.readFileSync("local/manifest.json", "utf-8", (err, data) => {
		if (err) {
			throw new Error(err);
		}
		return JSON.parse(data);
	});
})();

module.exports = JSON.parse(credentials);
