const express = require('express');
const app = express();

const { config } = require('./config/index');

const modulesApi = require('./routes/movies.js');

modulesApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
