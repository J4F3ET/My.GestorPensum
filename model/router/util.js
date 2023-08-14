import {verify} from "jsonwebtoken";
const secret = "s23d23fg34k2jb34"; // llave secreta para el token
/**
 * verifica si el usurio cuenta con un cookie, si no lo tiene lo redirecciona
 * se redirecciona al login
 * @param {object} req es la peticion y contiene el las cookies
 * @param {object} res es la respuesta
 * @param {object} next es el siguiente paso, si no hay error
 */
function step_back(req, res, next) {
	!req.cookies.DataLogin ? next() : res.render("/index");
}
/**
 * la funcion auntenticando verifica si el usuario esta auntenticado con un token
 * si no esta auntenticado lo redirecciona al login
 * @param {object} req es la peticion y contiene el token
 * @param {object} res es la respuesta
 * @param {object} next es el siguiente paso, si no hay error
*/
function auntenticando(req, res, next) {
	verify(req.cookies.DataLogin, secret, (err) => {
		!err ? next() : res.render("/login");
	});
}
export{auntenticando,secret,step_back,};
