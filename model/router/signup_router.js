import { Router } from "express";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";
import { execute } from "../data_base/db.js";
const step_back = require("./util").step_back;
const secret = require("./util").secret;
const router = Router();

router.post("/register", async (req, res) => {
	const [exists] = await execute(
		`SELECT usuario.nombre, usuario.password, usuario.id
		FROM usuario
		WHERE usuario.nombre= ?`,
		[req.body.user]
	);
	if (exists[0]) {
		return res.json({
			message: `El nombre de usuario ${req.body.user} ya existe.`,
		});
	}
	const password = await hash(req.body.password, 10);
	const [response] = await execute(
		`INSERT INTO usuario (nombre, password) VALUES (?,?)`,
		[req.body.user, password]
	);
	if (!response.insertId) {
		return res.json({
			message: `Se presento un error ,${req.body.user} disculpanos.`,
		});
	}
	const [rows] = await execute(
		`SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= ?`,
		[req.body.user]
	);
	console.log(rows);
	const token = sign(
		{
			userId: rows[0].id,
			password: rows[0].password,
			username: rows[0].nombre,
		},
		secret,
		{expiresIn: "1h"}
	);
	const serialized = serialize("DataLogin", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 3650,
		path: "/",
	});
	res.setHeader("Set-Cookie", serialized);
	res.json(rows[0]);
});
router.get("/signup", step_back, (req, res) => res.render("signup"));
export default router;
