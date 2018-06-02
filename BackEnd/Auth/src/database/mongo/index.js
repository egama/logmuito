const mongoose = require('mongoose');
const configApp = require('../../_config/config')

//mongoose.connect("mongodb://localhost/logmuito");

module.exports = (db) => {
    var connString = configApp.mongoAccess.host + db;
    if (db == "")
        connString += configApp.mongoAccess.dbCompanies

    mongoose.connect(connString);
    mongoose.Promise = global.Promise;

    return mongoose;
}