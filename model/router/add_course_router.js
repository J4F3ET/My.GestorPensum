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
		`SELECT materia.nombre as materia, materia.semestre as semestre,materia.id as id_materia FROM materia WHERE materia.usuario = ?`,
		[decode.userId]
	);
	if (!materia) return res.json({message: "No posee materias"});
	return res.json(materia);
});
router.post("/materias_del_usuario", auntenticando, async(req, res) => {
	if (!req.cookies.DataLogin) return res.json({message: "Error en cookies"});
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materia] = await conn.execute(
		`SELECT usuario		
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

router.post("/add_course_pensum", auntenticando, async(req, res) => {
	if (!req.cookies.DataLogin) return res.json({message: "Error en cookies"}).res.redirect('/login');
	console.log(req.body.color);
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	// const [materia] = await conn.execute(
	// 	`INSERT INTO materia
	// 	(nombre, semestre, tipo, creditos, HTD, HTA, HTC, color, estado, usuario) 
	// 	VALUES (?,?,?,?,?,?,?,?,?,?)`,
	// 	[
	// 		req.body.nombre,
	// 		req.body.semestre,
	// 		req.body.tipo,
	// 		req.body.creditos,
	// 		req.body.HTD,
	// 		req.body.HTA,
	// 		req.body.HTC,
	// 		req.body.color,
	// 		1,
	// 		decode.userId
	// 	]
	// );
	// if (!materia) return res.json({message: "Error en registrar materia"});
	// if (req.body.requerimientos_0 || req.body.requerimientos_0 != ""){
	// 	for (let i = 0; i < req.body.requerimientos_0.length; i++){
	// 		const [materia_relacion] = await conn.execute(
	// 			`INSERT INTO materia_relacion
	// 			VALUES (?,?)`,
	// 			[
	// 				materia.insertId,
	// 				req.body.'requerimientos_${i}',
	// 			]
	// 		);
	// 	}
	// }
	// if (!req.body.beneficios_0 || req.body.beneficios_0 == "") return res.redirect("/index");	
	// console.log(materia);
	console.log(req.body);	
	res.end();
	// res.redirect("/index");
});

module.exports = router;
