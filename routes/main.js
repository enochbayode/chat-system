const express = require('express');
const mainrouter = express.Router();
const { homeController } = require('../controllers/main');

mainrouter.get('/', homeController);




module.exports = { mainrouter };
