<<<<<<< HEAD
const express = require('express');
const morgan = require('morgan');
const login = require('./router/login_router.js');
const index = require('./router/index_router.js');
const path = require('path');
const app = express();

// MIDDLEWARES
// console.log(path.join(path.resolve(__dirname, '..', 'controllers')));
app.use(morgan());
app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(__dirname, '..', 'views'),'public'));
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENROUTERS

app.use(login);
app.use(index);

app.listen("5500");
=======
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
>>>>>>> 211fdeca81d154feac5e99895ba97a70f3e1e5f8
