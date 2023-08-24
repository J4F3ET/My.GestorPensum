import conn from "../data_base/db";
/**
 *Este metodo se encarga de buscar las materias que tiene el usuario respectivo
 * @param {number} user_id el id del usuario
 * @returns {Object[]} materias que esta cursando el usuario o un mensaje de error
 * @example [{id: 1, color: "#000000", materia: "Calculo 1", semestre: 1}]
 * @throws {message,error} Error en la ejecucion de la sentencia
 */
export async function get_subjects_services(user_id) {
    let result;
    try {
        result = await conn.query(
					`SELECT materia.id as id,
                            materia.color as color,
                            materia.nombre as materia,
                            materia.semestre as semestre
                    FROM materia
                    WHERE materia.usuario = $1`,
					[user_id]
				);
    } catch (error) {
        console.log("Error en get_subjects_services al ejecutar la sentencia \n" + error);
    }
return result[0]!= undefined? result[0]: {message:"Error en la ejecucion de la sentencia" ,error: error};
};
/**
 * Este metodo se encarga de buscar las materias que tiene el usuario respectivo
 * en el horario actual.
 * @param {number} user_id el id del usuario
 * @returns {json} materias que esta cursando el usuario o un mensaje de error
 * Estados de materias
 * 1 = No inscrita
 * 2 = Cursando
 * 3 = Aprobada
*/
export async function get_subjects_schedule_services(user_id) {
    let result;
    try {
        result =
					await conn.query(`SELECT
                                        materia.nombre AS Materia,
                                        (materia.HTD+materia.HTC) AS Horas
                                    FROM usuario INNER JOIN materia on (usuario.id=materia.usuario)
                                    WHERE usuario.id = $1 AND materia.estado = 2`,
                                    [user_id]);
    } catch (error) {
        console.log("Error en get_subjects_schedule_services al ejecutar la sentencia \n" + error);
    }
return result[0]? result[0]: {message:"Error en la ejecucion de la sentencia" ,error: error};
};
/**
 * Este metodo se encarga de registrar la materia que tiene el usuario respectivo
 * @param {Object} user los datos del usuario
 * @param {Object} materia los datos de la materia
 * @example user = {id: 1}
 * @example materia = {id: 1, nombre: "Calculo 1", semestre: 1, tipo: 1, creditos: 4, htd: 4, hta: 0, htc: 4, color: 1, estado: 1}
*/
export async function register_subjects(user, materia){
    try{
        await conn.query(
            `INSERT INTO public.materia(id, nombre, semestre, tipo, creditos, htd, hta, htc, color, estado)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
            []
        );

    }catch(error){}

};