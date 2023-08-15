import { Router, json } from "express";
import { hash } from "bcrypt";
import conn from "../data_base/db.js";
import { step_back,path_views,create_cookie,create_token } from "./util.js";
const router = Router();
/**Metodo envia al usuario a registrarse */
router.get("/signup", step_back, (req, res) =>
	res.sendFile("signup.html", {root: path_views})
);
/**Metodo envia al usuario a iniciar sesion y registrarse*/
router.post("/register", async (req, res) => {
	try{
		//validar que no exista el usuario
		let query = `SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= $1`;
		let queryParam = [req.body.user];
		let result = await conn.query(query, queryParam);
		if (result.rows[0]) {
			return res.json({
				message: `El nombre de usuario ${req.body.user} ya existe.`,
			});
		}
		//crear usuario
		const password = await hash(req.body.password, 10);
		query = `INSERT INTO usuario (nombre, password) VALUES ($1,$2)`;
		queryParam = [req.body.user, password];
		result = await conn.query(query, queryParam);
		//crear token
		query = `SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= $1`;
		queryParam = [req.body.user];
		result = await conn.query(query, queryParam);
		console.log(result.rows);
		const token = create_token(result.rows);
		const cookie = create_cookie(token);
		res.setHeader("Set-Cookie", cookie);
		res.json(result.rows);
	}catch(err){
		console.log(err);
	}
});

export default router;
