<<<<<<< HEAD
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const conn = require('../data_base/db.js');

const public = path.resolve(__dirname, '..', '..', 'views','public');
const private = path.resolve(__dirname, '..', '..', 'views','private');

const router = Router();
// Enrutamientos

router.get('/',(req, res) =>res.render('login'));
router.get('/index',(req,res) => res.render('index'));
router.get('/login',(req, res) => res.render('login'));

router.post('/register', async(req, res)=>{
    const password = await bcrypt.hash(req.body.password, 10);
    const [rows] = await conn.query(`INSERT INTO usuario (nombre, password) VALUES ('${req.body.user}','${password}')`);
    res.json(rows);
});

router.post('/login',async(req, res) => {
    const [rows] = await conn.query(`SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= '${req.body.user}'`);
    if(rows[0] && (await bcrypt.compare(req.body.password,rows[0].password))){
        const payload = {userId: rows[0].id ,password: rows[0].password,username: rows[0].nombre}
        const secret = "s23d23fg34k2jb34";
        
        res.json(rows[0]);
    }else if(rows[0]){
        res.json({message: "Contraseña incorrecta."});
    }else{
        res.json({message: "Usuario no existe."});
    };
});


module.exports = router;
=======
import { Router } from "express";
import { get_login_user } from "../controllers_router/login_controllers.js";
const router = Router();
router.get('/',get_login_user);
export default router;
>>>>>>> 211fdeca81d154feac5e99895ba97a70f3e1e5f8
