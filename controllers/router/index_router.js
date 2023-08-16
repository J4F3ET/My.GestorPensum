import {Router} from "express";
import {verify} from "jsonwebtoken";
import {auntenticando, path_views, secret} from "../util";
import conn from "../../model/data_base/db.js";
const router = Router();
/**
 * Metodo para entrar a la pagina principal.
 */
router.get("/index", auntenticando, (req, res) =>
	res.sendFile("index.html", {root: path_views})
);
/**
 * Metodo para retornar informacion del usuario las materias que actualmente esta cursando.
 * Estados de materias
 * 1 = No inscrita
 * 2 = Cursando
 * 3 = Aprobada
 */
router.post("/horario_materias", auntenticando, async (req, res) => {
	const decode = verify(req.cookies.DataLogin, secret);
	const query = `SELECT materia.nombre AS Materia, (materia.HTD+materia.HTC) AS Horas
		FROM usuario INNER JOIN materia on (usuario.id=materia.usuario)
		WHERE usuario.id = $1 AND materia.estado = 2`;
	const queryParams = [decode.userId];
	const materias = await conn.query(query, queryParams, (err, result) => {
		if (err) return res.json({message: "Error al obtener las materias"});
		return result.rows;
	});
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
