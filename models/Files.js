const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema(
	{
		path: { type: String, required: true },
	},
	{ timestaps: true }
);
module.exports = mongoose.model("File", FileSchema);
