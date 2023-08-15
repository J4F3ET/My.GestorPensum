import {Router} from "express";
import {compare} from "bcrypt";
import {path_views, step_back, create_cookie, create_token} from "./util";
import conn from "../data_base/db.js";
const router = Router();
/**
 * Método para mostrar la vista de inicio de sesión con la ruta /.
 */
router.get("/", step_back, (req, res) => {
	res.sendFile("login.html", {root: path_views});
});
/**
 * Método para mostrar la vista de inicio de sesión con la ruta /login.
 */
router.get("/login", step_back, (req, res) =>
	res.sendFile("login.html", {root: path_views})
);
/**
 *  Método para iniciar sesión en la aplicación.
 */
router.post("/login", async (req, res) => {
	const query = `SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= $1`;
	const queryParam = [req.body.username];
	try {
		let result = await conn.query(query, queryParam);
		if (!result.rows) {
			return res.json({message: "Usuario no existe."});
		}
		if (!(compare(req.body.password, result.rows[0].password))) {
			return res.json({message: "Contraseña incorrecta."});
		}
		// Generar token
		const token = create_token(result.rows);
		// Setear cookie
		const serialized = create_cookie(token);
		// Enviar respuesta
		res.setHeader("Set-Cookie", serialized);
		res.json(result.rows);
	} catch (error) {
		console.log(error);
	}
});
export default router;
