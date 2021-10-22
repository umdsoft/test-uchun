const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registratsiya
exports.register = async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ success: false, data: "error" });
	}

	// Parolni shifrlash 12 roundli shifr
	const salt = await bcrypt.genSaltSync(12);
	const password = await bcrypt.hashSync(req.body.password, salt);

	// Foydalanuvchini yaratish
	const user = new User(req.body);
	user.password = password;
	user.save()
		.then(() => {
			return res.status(200).json({ success: true });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, err });
		});
};

// Avtorizatsiya
exports.login = async (req, res) => {
	await User.findOne({ login: req.body.login }, (err, data) => {
		if (err) return res.status(400).json({ success: false, err });
		if (!data) {
			return res
				.status(404)
				.json({ success: false, data: "login yoki parol xato" });
		}
		// Parolni tekshirish
		if (!bcrypt.compareSync(req.body.password, data.password)) {
			return res
				.status(404)
				.json({ success: false, data: "login yoki parol xato" });
		}

		// Token yaratish
		const SECRET = "kjasd891hjod9001h981h29dj8129ehdj0998vh89rh91uj!@";
		const payload = { id: data._id };
		const token = jwt.sign(payload, SECRET);
		return res.status(200).json({ success: true, token });
	});
};

// Barcha foydalanuvchilar
exports.getAll = async (req, res) => {
	await User.find()
		.sort({ createdAt: -1 })
		.select({ password: 0 })
		.skip((req.query.page - 1) * req.query.limit)
		.limit(parseInt(req.query.limit))
		.exec((err, data) => {
			if (err) return res.status(400).json({ success: false, err });
			return res.status(200).json({ success: true, data });
		});
};

// User edit admin uchun
exports.edit = async (req, res) => {
	// if (req.body.password) {
	// 	// Parolni shifrlash 12 roundli shifr
	// 	const salt = await bcrypt.genSaltSync(12);
	// 	const password = await bcrypt.genHashSync(req.body.password, salt);
	// }
	// req.body.password = password;
	await User.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		{ new: true }
	).exec((err, data) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true, data });
	});
};

// Foydalanuvchi ma`lumotlari
exports.my = async (req, res) => {
	const head = req.headers.authorization;
	const token = head.slice(7);
	const candidate = jwt.decode(token);
	await User.findOne({ _id: candidate.id })
		.select({ password: 0 })
		.exec((err, data) => {
			if (err) return res.status(400).json({ success: false, err });
			return res.status(200).json({ success: true, data });
		});
};
