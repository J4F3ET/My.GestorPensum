import {Router} from "express";
import {verify} from "jsonwebtoken";
import {auntenticando, path_views, secret} from "../util";
import conn from "../../model/data_base/db.js";
import {get_subjects_schedule_services,get_subjects_services} from "../../model/services/subject_services.js";
const router = Router();
/**
 * Metodo para entrar a la pagina principal.
 */
router.get("/index", auntenticando, (req, res) =>
	res.sendFile("index.html", {root: path_views})
);
/**
 * Metodo para retornar las materias que esta cursando actualmente el usuario
 * @returns {json} materias que esta cursando el usuario o un mensaje de error
 */
router.post("/horario_materias", auntenticando, async (req, res) => {
	const decode = verify(req.cookies.DataLogin, secret);
	let subjects;
	try {
		subjects = await get_subjects_schedule_services(decode.userId);
	} catch (error) {
		console.log("Error en el CTO \n"+error);
	}
	return !subjects.message
		? res.json(materias)
		: res.json({message: "No se encontraron materias"});
});

router.post("/pensum_materias", auntenticando, async (req, res) => {
	const decode = verify(req.cookies.DataLogin, secret);
	let subjects;
	try {
		subjects = get_subjects_services(decode.userId);
	} catch (error) {
		if(error.message === "No se encontraron materias"){
			return res.json({message: "No se encontraron materias"});
		}
		console.log("Error en el CTO \n"+error);
	}
	return !subjects.message? res.json(subjects): res.json({message: "No se encontraron materias"});
});
export default router;
