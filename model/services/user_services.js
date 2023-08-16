import {hash} from "bcrypt";
import conn from "../data_base/db.js";
/**
 * Este metodo se encarga de registrar un usuario en la base de datos.
 * @param {*} user el nombre de usuario
 * @param {*} password_user la contraseña del usuario
 * @returns usuario registrado
 */
export async function register_user_services(user, password_user) {
	let result;
	try {
		result = await conn.query(
			"SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= $1",
			[user]
		);
		if (result.rows[0] != undefined) {
			return {message: result.rows[0].nombre + " ya existe"};
		}
	} catch (error) {
		return "Error al buscar usuario existente, funcion register_user" + error;
	}
	try {
		const password = await hash(password_user, 10);
		result = await conn.query(
			"INSERT INTO usuario (nombre, password) VALUES ($1,$2)",
			[user, password]
		);
	} catch (error) {
		return (
			"Error en registrar usuario o generar el hash de la contrasenia" + error
		);
	}
	try {
		result = await conn.query(
			"SELECT usuario.nombre, usuario.id FROM usuario WHERE usuario.nombre= $1",
			[user]
		);
		return result.rows[0];
	} catch (error) {
		return "Error al buscar usuario existente, funcion register_user" + error;
	}
}
/**
 * Este metodo se encarga de buscar un usuario en la base de datos.
 * @param {*} user el nombre de usuario
 * @returns usuario registrado o message
*/
export async function login_user_services(user){
    let result;
    try {
        result = await conn.query(
            "SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= $1",
            [user]
        );
    } catch (error) {
        return "Error al buscar usuario existente, funcion login_user_services" + error;
    }
    return result.rows[0]?result.rows[0]:{message:"Usuario no existe."};
}