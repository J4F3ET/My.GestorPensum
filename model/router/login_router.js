const { Router } = require('express');
const {serialize} = require('cookie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const conn = require('../data_base/db.js');
const secret = "s23d23fg34k2jb34";
const router = Router();
const public = path.resolve(__dirname, '..', '..', 'views','public');
// const private = path.resolve(__dirname, '..', '..', 'views','private');

// Enrutamientos
router.get('/',step_back,(req, res) =>res.render('login'));
router.get('/login',step_back,(req, res) => res.render('login'));
router.get('/index',auntenticando,(req, res) => res.render('index'));

router.post('/login',async(req, res) => {
    const [rows] = await conn.query(`SELECT usuario.nombre, usuario.password, usuario.id FROM usuario WHERE usuario.nombre= '${req.body.user}'`);
    if(rows[0] && (await bcrypt.compare(req.body.password,rows[0].password))){
        const token = jwt.sign({userId: rows[0].id ,password: rows[0].password,username: rows[0].nombre}, secret, { expiresIn: '1h' });
        const serialized = serialize('DataLogin',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3650,
            path: '/'
        });
        res.setHeader('Set-Cookie',serialized)
        res.json(rows[0]);
    }else if(rows[0]){
        res.json({message: "Contraseña incorrecta."});
    }else{
        res.json({message: "Usuario no existe."});
    };
});
router.post('/register', async(req, res)=>{
    const password = await bcrypt.hash(req.body.password, 10);
    const [rows] = await conn.query(`INSERT INTO usuario (nombre, password) VALUES ('${req.body.user}','${password}')`);
    res.json(rows);
});

function step_back(req, res, next){
    if(req.cookies.DataLogin){
        res.redirect('/index');
    }else{
        next();
    }
}

function auntenticando(req,res,next){
   jwt.verify(req.cookies.DataLogin,secret,(err)=>{
    if(err){
        console.log(err)
        throw new Error
    }else{
        next()
    };    
   });
}
module.exports = router;