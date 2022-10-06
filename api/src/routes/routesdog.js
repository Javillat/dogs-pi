const { Router } = require('express');
const dog = require('../controllers/dogfn.js');

const routerdog = Router();

routerdog.get('', dog.dogsByName);
// routerdog.get('/:id', dog.dogById);
// routerdog.post('/', dog.postDog);

module.exports = routerdog;