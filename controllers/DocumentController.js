const Document = require("../models/Document");
const jwt = require("jsonwebtoken");
// Yaratish
exports.create = (req, res) => {
	if (!req.body) {
		return res.status(400).json({ success: false, err });
	}
	const head = req.headers.authorization;
	const token = head.slice(7);
	const candidate = jwt.decode(token);
	const document = new Document(req.body);
	document.sender = candidate.id;
	document
		.save()
		.then(() => {
			return res.status(200).json({ success: true });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, err });
		});
};

// Shaxsiy habarlar
exports.myDocument = async (req, res) => {
	const head = req.headers.authorization;
	const token = head.slice(7);
	const candidate = jwt.decode(token);
	await Document.find({ receiver: candidate.id })
		.select({ createdAt: 1, title: 1, sender: 1 })
		.sort({ createdAt: -1 })
		.skip((req.query.page - 1) * req.query.limit)
		.limit(parseInt(req.query.limit))
		.populate({ path: "sender", select: { name: 1 } })
		.exec((err, data) => {
			if (err) return res.status(400).json({ success: false, err });
			return res.status(200).json({ success: true, data });
		});
};

// Bitta xujjatni o`qish
exports.OneDocument = async (req, res) => {
	await Document.findOne({ _id: req.params.id }).exec((err, data) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, data });
	});
};
