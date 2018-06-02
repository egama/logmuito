const configApp = require('../../_config/config');
const mongoose = require("../../database/mongo")(configApp.mongoAccess.dbCompanies);

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        test: "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\\.[A-Za-z]{2,64}"
    },
    password: {
        type: String,
        require: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        require: true
    },
    createAt: {
        type: Date,
        default: Date.Now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;