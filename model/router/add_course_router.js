const {Router} = require("express");
const jwt = require("jsonwebtoken");
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const {auntenticando} = require("./util");
const router = Router();
router.post("/return_materia_requisito", auntenticando, async (req, res) => {
	if (!req.cookies.DataLogin) return res.json({message: "Error en cookies"});
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materia] = await conn.execute(
		`SELECT usuario.id AS usuario_id,materia.nombre AS materia,materia.semestre AS semestre,materia_requisito.nombre AS materia_relacion,materia_requisito.semestre AS semestre_relacion 
			FROM usuario  
				LEFT JOIN materia_relacion ON (id_usuario=usuario.id) 
				LEFT JOIN materia ON (id_materia= materia.id) 
				LEFT JOIN materia AS materia_requisito ON (materia_requisito.id=materia_relacion.id_relacion)
				WHERE usuario.id = ?;`,
		[decode.userId]
	);
	if (!materia) return res.json({message: "No posee materias"});
	console.log(materia);
	return res.json(materia);
});
router.get("/add_course", auntenticando, (req, res) => {
	res.render("add_course");
});
router.post("/add_course_pensum", auntenticando, (req, res) => {
	console.log(req.body);
	res.end();
});

module.exports = router;
