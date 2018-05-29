const mongoose = require('mongoose');
const configApp = require('../_config/config')

mongoose.connect(configApp.mongoAccess.connectionString);
//mongoose.connect("mongodb://localhost/logmuito");
mongoose.Promise = global.Promise;

module.exports = mongoose;