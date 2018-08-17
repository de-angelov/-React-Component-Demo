const { Router } = require('express');
const fs = require('fs');


const init = (app) => {
  const router = new Router();
  router
  .get('/', async (req, res) => {
    fs.readFile('./app/storage/eventData.json', 'utf8', (err, data) => {
      if (err) { throw err; }
      const obj = JSON.parse(data);
      res.json(obj);
    });
  })
  .post('/',async (req, res) => {
    const eventData = req.body.eventData;
    console.log(eventData);
    res.sendStatus(200);
    fs.writeFile('./app/storage/eventData.json', JSON.stringify(eventData, null, 2) , 'utf-8');

  });

  app.use('/', router);
}

module.exports = {
  init,
}