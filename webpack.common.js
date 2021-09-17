const path = require('path');

const entries = {};
entries["module"] = "./index.js";
entries["browser"] = "./browser.js";

module.exports = {
	entry: entries,
	target: "web"
};
