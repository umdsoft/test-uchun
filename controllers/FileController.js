const File = require("../models/Files");

// Fayl yaratish
exports.create = (req, res) => {
	const file = new File({
		path: req.file.path,
	});
	file.save()
		.then(() => {
			return res.status(200).json({ success: true, file: file });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, err });
		});
};
