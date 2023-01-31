const {Router} = require("express");
const jwt = require("jsonwebtoken");
const {auntenticando} = require("./util");
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const router = Router();
router.get("/index", auntenticando, (req, res) => res.render("index"));
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
router.post("/horario_materias", auntenticando, async (req, res) => {
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materias] = await conn.query(
		`SELECT materia.nombre AS Materia, (materia.HTD+materia.HTC) AS Horas 
		FROM usuario LEFT JOIN usuario_materia on(usuario.id=usuario_materia.id_usuario) 
		LEFT JOIN materia ON (materia.id = usuario_materia.id_materia) 
		WHERE usuario.id = ${decode.userId} AND materia.estado = 2`
	);
	// {"Materia":"CAL DIFERENCIAL","Horas":9}
	if (materias[0]) return res.json(materias);
	else res.json({message: "No se encontraron materias"});
});
router.get("/pensum_materias", auntenticando, async (req, res) => {
	const decode = jwt.verify(req.cookies.DataLogin, secret);
	const [materias] = await conn.query(
		`SELECT materia.*,materia_requisito.* FROM usuario 
		LEFT JOIN materia_relacion on(id_usuario=usuario.id) 
		LEFT JOIN materia on (id_materia= materia.id) 
		LEFT JOIN materia AS materia_requisito ON (materia_requisito.id=materia_relacion.id_relacion)
		WHERE usuario.id =  ${decode.userId}`
	);
	return res.json(materias);
});
module.exports = router;
