const {Router} = require("express");
const jwt = require("jsonwebtoken");
const {auntenticando} = require("./util");
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const router = Router();
router.get("/index", auntenticando, (req, res) => res.render("index"));
router.post("/horario_materias", auntenticando, async (req, res) => {
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materias] = await conn.execute(
		`SELECT materia.nombre AS Materia, (materia.HTD+materia.HTC) AS Horas 
		FROM usuario INNER JOIN materia on (usuario.id=materia.usuario)  
		WHERE usuario.id = ? AND materia.estado = 2`,
		[decode.userId]
	);
	if (materias[0]) return res.json(materias);
	else res.json({message: "No se encontraron materias"});
});
router.post("/pensum_materias", auntenticando, async (req, res) => {
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materias] = await conn.execute(
		`SELECT materia.id as id,materia.color as color,materia.nombre as materia, materia.semestre as semestre FROM materia WHERE materia.usuario = ?`,
		[decode.userId]
	);
	return res.json(materias);
});
module.exports = router;
