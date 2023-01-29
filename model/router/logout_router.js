const {Router} = require("express");
const {serialize} = require("cookie");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const conn = require("../data_base/db.js");
const step_back = require("./util").step_back;
const secret = require("./util").secret;
const router = Router();
router.get("/seccion_close", (req, res) => {
	if (!req.cookies) {
		return res.render("login");
	}
	try {
		jwt.verify(req.cookies.DataLogin, secret);
		const serialized = serialize("DataLogin", null, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0,
			path: "/",
		});
		res.setHeader("Set-Cookie", serialized);
		res.redirect("index");
	} catch (error) {}
});
module.exports = router;
