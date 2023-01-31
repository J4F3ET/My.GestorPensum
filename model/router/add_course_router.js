const {Router} = require("express");
const jwt = require("jsonwebtoken");
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const {auntenticando} = require("./util");
const router = Router();
router.post("/return_materia_requisito", auntenticando, async (req, res) => {
	if (!req.cookies.DataLogin) return res.json({message: "Error en cookies"});
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materia] = await conn.query(
		`SELECT usuario.id AS usuario_id,materia.nombre AS materia,materia.semestre AS semestre,materia_requisito.nombre AS materia_relacion,materia_requisito.semestre AS semestre_relacion FROM usuario  LEFT JOIN materia_relacion on(id_usuario=usuario.id) LEFT JOIN materia on (id_materia= materia.id) LEFT JOIN materia AS materia_requisito ON (materia_requisito.id=materia_relacion.id_relacion)WHERE usuario.id = ${decode.userId};`
	);
	// [{"usuario_id":#,"materia":"CAL DIFERENCIAL","semestre":1,"materia_relacion":"CAL INTEGRAL","semestre_relacion":2}]
	if (!materia) return res.json({message: "No posee materias"});
	console.log(materia);
	return res.json(materia);
});
router.get("/add_course", auntenticando, (req, res) => {
	res.render("add_course");
});

module.exports = router;
