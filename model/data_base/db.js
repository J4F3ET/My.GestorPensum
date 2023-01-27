<<<<<<< HEAD
// import {createPool} from 'mysql2/promise';
// export const conn = createPool({});
const { createPool } = require('mysql2/promise');
const conn = createPool({
=======
import {createPool} from 'mysql2/promise';
export const conn = createPool({
>>>>>>> 211fdeca81d154feac5e99895ba97a70f3e1e5f8
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'base_de_datos_pensum'
<<<<<<< HEAD
});
module.exports = conn;
=======
});
>>>>>>> 211fdeca81d154feac5e99895ba97a70f3e1e5f8
