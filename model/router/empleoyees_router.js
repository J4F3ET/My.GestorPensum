import { Router } from "express";
import {conn} from '../data_base/db.js';
const router = Router();
router.get('/', (req, res) => {
    res.render('/login','ejs');
});
router.get("/retornar_usuarios",async (req,res) => {
   const r =  await conn.query("SELECT usuario.nombre AS usuario, materia.nombre as materia FROM usuario JOIN usuario_materia ON(usuario_materia.id_usuario=usuario.id) JOIN materia ON(materia.id = usuario_materia.id_materia) WHERE usuario.id = 1;")
   res.json(r);
});
router.post('/submition', (req, res) => {
    const { username, password } = req.body;
    // Do something with the data
    res.send(`Welcome ${username}`);
});
router.post('/solicitando_materias_de_usuario',(req,res)=>{

});
router.post('/agregar_horario_post',(req,res)=>{
    
});
export default router;