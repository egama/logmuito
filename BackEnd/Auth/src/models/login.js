const mongoose = require("../database");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        require: true,
        default: Date.Now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;