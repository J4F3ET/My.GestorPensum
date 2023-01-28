const { Router } = require('express');
const {serialize} = require('cookie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const step_back = require('./util').step_back;
const secret = require('./util').secret;
const conn = require('../data_base/db.js');
const router = Router();
router.get('/',step_back,(req, res) =>res.render('login'));
router.get('/login',step_back,(req, res) => res.render('login'));
router.post('/login',async(req, res) => {
    const [rows] = await conn.query(`SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= '${req.body.user}'`);
    if(!rows[0]) return res.json({message: "Usuario no existe."});
    if(!await bcrypt.compare(req.body.password,rows[0].password)) return res.json({message: "Contraseña incorrecta."});
    try {
        const token = jwt.sign({ userId: rows[0].id, password: rows[0].password, username: rows[0].nombre }, secret, { expiresIn: '1h' });
        const serialized = serialize('DataLogin',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3650,
            path: '/'
        });
        res.setHeader('Set-Cookie',serialized)
        res.json(rows[0]);
    } catch (error) {
        res.json({message: `Error: ${error}`});
    }
});
module.exports = router;
