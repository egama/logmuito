const configApp = require('../../_config/config');
const mongoose = require("../../database/mongo")(configApp.mongoAccess.dbCompanies);

const CompanyAddressSchema = mongoose.Schema({
    street: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    neighborhood: {
        type: String,
        require: true
    },
    complement: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        require: true
    }
});

const CompanyAddress = mongoose.model('CompanyAddress', CompanyAddressSchema);
module.exports = CompanyAddress;