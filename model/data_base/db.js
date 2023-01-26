// import {createPool} from 'mysql2/promise';
// export const conn = createPool({});
const { createPool } = require('mysql2/promise');
const conn = createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'base_de_datos_pensum'
});
module.exports = conn;