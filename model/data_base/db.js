import Pg from "pg";
/*
pg es un objeto de la libreria pg que nos permite conectarnos a la base de datos
y ejecutar consultas sql.
Tambien permite controlar las instancias de las conexiones a la base de datos.
parametros desconocidos:
  max: numero maximo de conexiones a la base de datos
  idleTimeoutMillis: tiempo maximo de espera para una conexion
  connectionTimeoutMillis: tiempo maximo de espera para una consulta
*/
const conn = new Pg.Pool({
	host: "localhost",
	port: "5432",
	user: "postgres",
	password: "root",
	database: "pensum",
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});
export default conn;
