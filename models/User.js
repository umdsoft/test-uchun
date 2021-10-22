const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			trim: true,
			required: true,
			min: 5,
			max: 60,
			unique: true,
		},
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["admin", "moderator", "user"],
			default: "user",
		},
		isDeleted: { type: Boolean, default: false },
		avatar: { type: String },
		name: { type: String, required: true, trim: true, min: 6, max: 100 },
		email: { type: String, required: true, unique: true, trim: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
