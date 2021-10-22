const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/zadacha";
const connect = async () => {
	mongoose
		.connect(URL, {
			useNewUrlParser: true,
		})
		.then(() => console.log("Baza ulandi..."))
		.catch((error) => console.log("Bazaga ulanishda xatolik.\n", error));
};

module.exports = connect;
