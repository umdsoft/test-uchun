const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: { type: String, required: true },
		file: { type: String },
		isView: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Document", DocumentSchema);
