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
