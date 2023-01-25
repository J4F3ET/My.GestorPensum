import express from 'express';
import {conn} from './db.js';
import morgan from 'morgan';
const app = express();
app.use(morgan());
app.get("/",async (req,res) => {
   const r =  await conn.query("SELECT usuario.nombre AS usuario, materia.nombre as materia FROM usuario JOIN usuario_materia ON(usuario_materia.id_usuario=usuario.id) JOIN materia ON(materia.id = usuario_materia.id_materia) WHERE usuario.id = 1;")
   res.json(r);
});
app.post('/submition', (req, res) => {
    const { username, password } = req.body;
    // Do something with the data
    res.send(`Welcome ${username}`);
});
app.post('/solicitando_materias_de_usuario',(req,res)=>{

});
app.post('/agregar_horario_post',(req,res)=>{
    
});
app.listen("5500");
