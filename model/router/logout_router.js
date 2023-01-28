const { Router } = require('express');
const {serialize} = require('cookie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const conn = require('../data_base/db.js');
const step_back = require('./util').step_back;
const secret = require('./util').secret;
const router = Router();
// router.get('/seccion_close',(req,res)=>{

// });
module.exports = router;