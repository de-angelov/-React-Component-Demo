const express = require('express');
const config = require('./config');
const routes = require('./routes');

const app = express();
config.init(app);
routes.init(app);

app.listen(4000, () => {
  console.log('server started port 4000');
})

