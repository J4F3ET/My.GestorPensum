const { Router } = require('express');
const jwt = require('jsonwebtoken');
const auntenticando = require('./util').auntenticando;
const router = Router();
router.get('/index',auntenticando,(req, res) => res.render('index'));
module.exports = router;