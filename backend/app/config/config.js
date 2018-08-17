const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}


const init = (app) => {
  if(typeof app.use !== 'function' || 
    typeof app.set !== 'function'){
      throw new Error ('invalid app');
    }
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(allowCrossDomain);
  app.use('/static', express.static(path.join(__dirname, '../storage')));
}

module.exports = {
  init,
}