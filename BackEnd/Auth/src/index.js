const express = require('express');
const bodyParser = require('body-parser');
const configApp = require('./_config/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Rotas
require('./controllers/authController')(app);

app.listen(configApp.app.port);