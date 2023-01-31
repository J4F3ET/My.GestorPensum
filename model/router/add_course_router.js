const {Router} = require("express");
const jwt = require("jsonwebtoken");
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const {auntenticando} = require("./util");
const router = Router();
/* 
insertar materias rapido para probar INSERT INTO `materia`(`nombre`, `semestre`, `tipo`, `creditos`, `HTD`, `HTA`, `HTC`, `color`, `estado`) VALUES ('Fisica I Newtoniana',2,1,3,3,3,3,1,1),('Fisica II Newtoniana',3,1,3,3,3,3,1,1),('Introduccion Agoritmos',1,1,3,3,3,3,1,1),('POO',2,1,3,3,3,3,1,1);
~~~~~~~~~SENTENCIA SEL PARA INSERTAR MATERIA
INSERT INTO `materia`
(nombre,semestre,tipo,creditos,HTD,HTA,HTC,color,estado)
VALUES ('[nombre]','[semestre INT]','[tipo INT]','[creditos INT]','[HTD INT]','[HTA INT]','[HTC INT]','[COLOR INT]','[ESTADO INT]')
~~~~~~~~~SENTENCIA PARA ENLAZAR MATERIA CON USUARIO.
INSERT INTO usuario_materia VALUES (id usuario,id materia)
~~~~~~~~~SENTENCIA PARA CONOCER LAS RELACIONES ENTRE MATERIA DE UN USUARIO EXACTO
SELECT * FROM usuario 
LEFT JOIN materia_relacion on(id_usuario=usuario.id) 
LEFT JOIN materia on (id_materia= materia.id) 
LEFT JOIN materia AS materia_requisito ON (materia_requisito.id=materia_relacion.id_relacion)
WHERE usuario.id = ${};
~~~~~~~~~SENTENCIA PARA CONOCER QUE MATERIA INSCRIBIO CADA USUARIO  AGREGE WHERE USUARIO ID PARA CONOCER EL DE UN USUARIO EN ESPECIFICO
SELECT * FROM usuario 
LEFT JOIN usuario_materia on(usuario.id=usuario_materia.id_usuario) 
LEFT JOIN materia ON (materia.id = usuario_materia.id_materia) 
WHERE usuario.id = ${};
~~~~~~~~~SENTENCIA PARA ESTABLECER MATERIAS "REQUISITO" Y MATERIAS "BENEFICIO"
 INSERT INTO materia relacion VALUES (ID DE USUARIO, ID MATERIA RAIZ, ID MATERIA RELACIONADA[BENEFICIO O REQUISITO]);
 ¡!para definir si es una requisito o beneficio depende de semestre 
~~~~~~~~~SENTENCIA PARA CONOCER LAS RELACIONES DE UN USUARIO Y MATERIAS
SELECT * 
FROM materia_relacion
LEFT JOIN materia AS RAIZ ON ( id_materia = RAIZ.id) 
LEFT JOIN materia ON( materia.id = id_relacion) WHERE id_usuario= ${};
*/
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
