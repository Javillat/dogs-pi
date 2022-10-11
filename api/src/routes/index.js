const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesdog = require('./routesdog.js')
const routestemperaments = require('./routestemperament.js');


const routerMain = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
routerMain.use('/dogs', routesdog);
routerMain.use('/temperaments', routestemperaments);


module.exports = routerMain;
