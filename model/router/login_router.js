// import { Router } from "express";
// import { get_login_user,post_login_user,error_login_user} from "../controllers_router/login_controllers.js";
const express = require('express');
const Router = express.Router;
const path = require('path');
const conn = require('../data_base/db.js');
const router = Router();
const public = path.resolve(__dirname, '..', '..', 'views','public');
const private = path.resolve(__dirname, '..', '..', 'views','private');

// Enrutamientos

router.get('/',(req, res) => {
    console.log('bandera 1');
    res.render('login');
    // res.render(path.join(public,'login'));
});

router.post('/login',async(req, res) => {
    const [rows] = await conn.query(`SELECT usuario.nombre, usuario.password FROM usuario WHERE usuario.password= '${req.body.password}'`);
    if (rows.length <= 0){
        console.log('bandera 2.1');
        res.render('login')
    }else if(rows[0].nombre == req.body.name){
        console.log('bandera 2.2');
        res.render(path.join('index'))
    };
});
router.get('/login',(req, res) => {
    console.log('bandera 3');
    res.render('login');
});

module.exports = router;