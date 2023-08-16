import {Router} from "express";
import {compare} from "bcrypt";
import {path_views, step_back, create_cookie, create_token} from "../util.js";
import {login_user_services} from "../../model/services/user_services.js";
import conn from "../../model/data_base/db.js";
const router = Router();
/**
 * Método para mostrar la vista de inicio de sesión con la ruta
 */
router.get("/", step_back, (req, res) => {
	console.log(path_views);
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
	let result;
	try {
		result = await login_user_services(req.body.username);
		if (result.message){
			return res.json(result.message);
		}
		if (! await compare(req.body.password, result.password)){
			return res.json({message: "Contraseña incorrecta."});
		}
		const token = create_token(result);
		const serialized = create_cookie(token);
		// Enviar respuesta
		res.setHeader("Set-Cookie", serialized);
		res.json({nombre:result.nombre, id:result.id});
	} catch (error) {
		console.log("Error en CTO /login \n"+error);
	}
});
export default router;
