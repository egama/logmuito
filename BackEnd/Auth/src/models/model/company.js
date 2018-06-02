const configApp = require('../../_config/config');
const Guid = require('guid');
const mongoose = require("../../database/mongo")(configApp.mongoAccess.dbCompanies);

const CompanySchema = mongoose.Schema({
    companyName: {
        type: String,
        require: true,
        unique: true,
    },
    companyContact: {
        type: String,
        require: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyAddress',
        require: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    }],
    hash: {
        type: String,
        require: true,
        default: Guid.raw()
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;