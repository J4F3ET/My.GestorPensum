const { Router } = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const conn = require('../data_base/db.js');

const public = path.resolve(__dirname, '..', '..', 'views','public');
const private = path.resolve(__dirname, '..', '..', 'views','private');

const router = Router();
// router.get(`/index?`,async (req, res) =>{


//  });

module.exports = router;