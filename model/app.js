// import express from 'express';
// import morgan from 'morgan';
// import login from './router/login_router.js';
// import path from 'path';
const express = require('express');
const morgan = require('morgan');
const login = require('./router/login_router.js');
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

app.listen("5500");
