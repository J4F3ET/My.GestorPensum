const {Router} = require("express");
const {serialize} = require("cookie");
const jwt = require("jsonwebtoken");
const step_back = require("./util").step_back;
const secret = require("./util").secret;
const conn = require("../data_base/db.js");
const router = Router();
// SENTENCIA SEL PARA INSERTAR MATERIA
// INSERT INTO `materia`
//(`nombre`,
//	 `semestre`,
//	 `tipo`,
//	 `creditos`,
//	 `HTD`,
//	 `HTA`,
//	 `HTC`,
//	 `color`,
//	 `requisitos`,
//	 `estado`)
//VALUES (
// 	'[nombre]',
// 	'[semestre INT]',
// 	'[tipo INT]',
// 	'[creditos INT]',
// 	'[HTD INT]',
// 	'[HTA INT]',
// 	'[HTC INT]',
// 	'[COLOR INT]',
// 	'[REQUISITO INT POSIBLE-NULL]',
// 	'[ESTADO INT]')
// SENTENCIA PARA ENLAZAR MATERIA CON USUARIO
/*
LA MATERIA YA DEBE DE EXISTIR
SE NECESITA EL ID DEL USUARIO

*/

//SENTENCIA PARA ESTABLECER MATERIAS "REQUISITO" Y MATERIAS "BENEFICIO"
// ejemplos
/* 
		CREO VA TOCAR ELIMINAR UNA DE LAS TABLAS DE MATERIA BENEFICIO O MATERIA REQUISITO PORT QUE 
		LAS DOS VAN A CONTENER LA MISMA INFORMACION POR ENDE ES MEJOR ESTABLECER LÑA RELACION DE LAS MATERIAS
		Y ASI DEPENDIENDO QUE SE MESTRE ES MAYOR Y CUAL ES MENOR PUES SE CONOCE LA MATERIA QUE SON BENEFICIOS Y MATERIAS QUE SON REQUISITO

			DADO QUE PUEDE AVER REDUNDANCIA VERTICAL Y HORIZONTAL, SE DEBE ESTABLECER UM METODO EN EL BACKEND QUE NO PERMITA ESO 
			UN EJEMPLO DE ESTO SERIA LA RELACION ENTRE MATERI ID 2 Y MATERIA ID 3 , DONDE LA RELACION ES MATERIA ID 2 Y 3 ENTONCES LA RELACION 3 Y 2 SERIA 
			EQUIVALENTE ASI QUE SE DEBE ESTABLECER UNA RELACION QUE PERMITE PREGUNTARLE A LA BASE DE DATOS SI YA EXISTE AL RELACION "INVERSA A LA QUE SE ESTA CREANDO"
			UN EJEMPLO 
			SI YA EXISTE LA RELACION 2 A 3 NO DEBERIAMOS PERMITIR LA RELACION 3 A 2
			DEPENDIENDO QUIEN TIENE EL NUMERO DE SEMESTRE MAS ALTO SERIA O REQUISITO O BENEFICIO DE LA OTRA MATERIA
			INSERT INTO `materia`(`nombre`, `semestre`, `tipo`, `creditos`, `HTD`, `HTA`, `HTC`, `color`, `requisitos`, `beneficio`, `estado`) 
			VALUES ('CAL DIFERENCIAL',1,1,4,3,3,6,1,NULL,NULL,1), 
			('CAL INTEGRAL',2,1,3,3,3,3,1,NULL,NULL,1);
		*/
router.get("/add_course", (req, res) => {
	console.log("bandera");
	res.render("add_course");
});

module.exports = router;
