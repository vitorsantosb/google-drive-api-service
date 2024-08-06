const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Controllers
const googleController = require("./modules/googleApi.controller")

app.use(cors({
  origin: ['https://localhost:3000', 'https://vitorbcs.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100mb',
  parameterLimit: 250000,
}));

app.use(bodyParser.json());
app.use('/', googleController);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['http://localhost:3001', 'http://localhost:3000', 'https://meviucb.com', 'https://api.meviucb.com', 'https://api-dev.meviucb.com', 'https://dev.meviucb.com', 'api.meviucb.com', 'api-dev.meviucb.com']);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    return res.status(200).send({});
  }
  next();
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message
    }
  });
});

module.exports = app;