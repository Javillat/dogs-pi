const { Router } = require('express');
const temperament = require('../controllers/temperamentsfn.js');

const routertemperament = Router();

routertemperament.get('/temperaments', temperament.getTemperaments);

module.exports = routertemperament;