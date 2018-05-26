const express = require('express');
const UserLogin = require('../models/auth');

const router = express.Router();

router.post('/login', (req, resp) => {
    try {
        var ul = new UserLogin();
        ul.login = req.body.login;
        ul.password = req.body.senha;
        return resp.send(ul);
    }
    catch (err) {
        return resp.status(400).send(err);
    }
});

module.exports = (app) => app.use('/auth', router);