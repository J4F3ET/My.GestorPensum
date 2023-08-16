import {verify, sign} from "jsonwebtoken";
import {serialize} from "cookie";
import path from "path";
const secret = "s23d23fg34k2jb34"; // llave secreta para el token
const path_views = path.join(__dirname, "../../", "/views/public");
/**
 * Verifica si el usurio cuenta con un cookie, si no lo tiene lo redirecciona
 * se redirecciona al login
 */
function step_back(req, res, next) {
	!req.cookies.DataLogin ? next() : res.render("/index");
}
/**
 * La funcion auntenticando verifica si el usuario esta auntenticado con un token
 * si no esta auntenticado lo redirecciona al login
*/
function auntenticando(req, res, next) {
	verify(req.cookies.DataLogin, secret, (err) => {
		!err ? next() : res.render("/login");
	});
}
/**
 * La funcion create_token crea un token
 * @param {object} rows es el resultado de la consulta a la base de datos.
 * @param {number} rows.id es el id del usuario
 * @param {string} rows.password es la contraseña del usuario
 * @param {string} rows.nombre es el nombre del usuario
*/
function create_token(rows){
	// Generar token
	try {
		const token = sign(
			{
				userId: rows[0].id,
				password: rows[0].password,
				username: rows[0].nombre,
			},
			secret,
			{expiresIn: "1h"}
		);
		return token;
	} catch (error){
		return error;
	}
}
/**
 * la funcion create_cookie crea un cookie
 * @param {object} token es el token que se va a guardar en el cookie
*/
function create_cookie(token){
	// Generar cookie
	try {
		const serialized = serialize("DataLogin", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 3650,
			path: "/",
		});
		return serialized;
	} catch (error){
		return error;
	}
}
export{
	create_cookie,
	create_token,
	auntenticando,
	step_back,
	secret,
	path_views
};
