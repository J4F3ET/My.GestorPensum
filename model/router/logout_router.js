import { Router } from "express";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { auntenticando } from "./util";
import { secret } from "./util";
const router = Router();
router.get("/seccion_close", auntenticando, (req, res) => {
	if (!req.cookies) {
		return res.render("login");
	}
	try {
		verify(req.cookies.DataLogin, secret);
		const serialized = serialize("DataLogin", null, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0,
			path: "/",
		});
		res.setHeader("Set-Cookie", serialized);
		res.redirect("index");
	} catch (error) {
		throw error;
	}
});
export default router;
