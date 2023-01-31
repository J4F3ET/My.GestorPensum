const {Router} = require("express");
const jwt = require("jsonwebtoken");
const {auntenticando} = require("./util");
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const router = Router();
router.get("/index", auntenticando, (req, res) => res.render("index"));

router.post("/horario_materias", auntenticando, async (req, res) => {
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materias] = await conn.query(
		`SELECT materia.nombre AS Materia, (materia.HTD+materia.HTC) AS Horas FROM usuario LEFT JOIN usuario_materia on(usuario.id=usuario_materia.id_usuario) LEFT JOIN materia ON (materia.id = usuario_materia.id_materia) WHERE usuario.id = ${decode.userId}`
	);
	// {"Materia":"CAL DIFERENCIAL","Horas":9}
	return res.json(materias);
});
module.exports = router;
