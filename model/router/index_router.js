import { Router } from "express";
import { verify } from "jsonwebtoken";
import { auntenticando } from "./util";
import { secret } from "./util";
import { execute } from "../data_base/db.js";
const router = Router();
router.get("/index", auntenticando, (req, res) => res.render("index"));
router.post("/horario_materias", auntenticando, async (req, res) => {
	const decode = verify(req.cookies.DataLogin, secret);
	const [materias] = await execute(
		`SELECT materia.nombre AS Materia, (materia.HTD+materia.HTC) AS Horas 
		FROM usuario INNER JOIN materia on (usuario.id=materia.usuario)  
		WHERE usuario.id = ? AND materia.estado = 2`,
		[decode.userId]
	);
	if (materias[0]) return res.json(materias);
	else res.json({message: "No se encontraron materias"});
});
router.post("/pensum_materias", auntenticando, async (req, res) => {
	const decode = verify(req.cookies.DataLogin, secret);
	const [materias] = await execute(
		`SELECT materia.id as id,materia.color as color,materia.nombre as materia, materia.semestre as semestre FROM materia WHERE materia.usuario = ?`,
		[decode.userId]
	);
	return res.json(materias);
});
export default router;
