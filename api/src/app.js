const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors(
  {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://javier-dogs.vercel.app',
      'dogs-1qswf01wt-javier-villatotos-projects.vercel.app',
      'dogs-git-main-javier-villatotos-projects.vercel.app'
    ],
    //origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  }
));

// server.use(cors({
//   const allowedOrigins = [
//     'http://localhost:3000', 
//     'https://javier-dogs.vercel.app', 
//     'dogs-1qswf01wt-javier-villatotos-projects.vercel.app', 
//     'dogs-git-main-javier-villatotos-projects.vercel.app'
//   ];
//   const origin = req.headers.origin;
//   console.log('Presente header',origin);

//   if(allowedOrigins.includes(origin)){
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   //res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
//   //res.header('Access-Control-Allow-Origin', 'https://javier-dogs.vercel.app' || 'http://localhost:3000'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });
// )

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
