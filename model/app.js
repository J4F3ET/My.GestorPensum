import express from 'express';
import morgan from 'morgan';
import empleoyees from './router/empleoyees_router.js';
import login from './router/login_router.js';
import ejs from 'ejs';
import path from 'path';

// const ejs = require('ejs');
const app = express();
// MIDDLEWARES
// app.set('view engine', 'ejs');
// app.use('/',(req,res,next)=>{});
app.set('view engine', 'ejs');
app.use(morgan());
// ENROUTERS
const currentDir = path.dirname(import.meta.url.split(':')[1]);
var loginPath = path.join(currentDir,'\\vista\\interfaces\\login.ejs');
app.get('/', function (req, res) {
    res.render(loginPath);
});
app.use(login);
app.listen("5501");
console.log("Escucha");
