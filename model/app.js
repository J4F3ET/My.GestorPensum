const express = require('express');
const morgan = require('morgan');
const login = require('./router/login_router.js');
const index = require('./router/index_router.js');
const logout = require('./router/logout_router.js');
const signup = require('./router/signup_router.js');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5500;
// MIDDLEWARES
app.use(morgan());
app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(__dirname, '..', 'views'),'public'));
app.use(express.static('views'));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
// ENROUTERS
app.use(login);
app.use(signup)
app.use(index);

app.listen(port,()=> console.log('Server listening on port '+ port));
