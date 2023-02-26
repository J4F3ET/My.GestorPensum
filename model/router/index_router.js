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
		FROM usuario LEFT JOIN usuario_materia on(usuario.id=usuario_materia.id_usuario) 
		LEFT JOIN materia ON (materia.id = usuario_materia.id_materia) 
		WHERE usuario.id = ? AND materia.estado = 2`,
		[decode.userId]
	);
	if (materias[0]) return res.json(materias);
	else res.json({message: "No se encontraron materias"});
});
router.post("/pensum_materias", auntenticando, async (req, res) => {
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materias] = await conn.execute(
		`SELECT materia_requisito.id AS id_relacion , materia.* FROM usuario 
		LEFT JOIN materia_relacion on(id_usuario=usuario.id) 
		LEFT JOIN materia on (id_materia= materia.id) 
		LEFT JOIN materia AS materia_requisito ON (materia_requisito.id=materia_relacion.id_relacion)
		WHERE usuario.id = ?`,
		[decode.userId]
	);
	return res.json(materias);
});
module.exports = router;
