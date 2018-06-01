const express = require('express');
const authBusiness = require('../business/authBusiness');

const router = express.Router();

router.post('/register', async (req, resp) => {
    try {
        var pro = new authBusiness();
        var response = await pro.register(req);
        return resp.send(response);
    }
    catch (err) {
        return resp.status(400).send(err);
    }
});

router.post('/authenticate', async (req, resp) => {
    try {
        var pro = new authBusiness();
        var response = await pro.authenticate(req);
        return resp.send(response);
    }
    catch (err) {
        return resp.status(400).send(err);
    }
});

router.post('/update', (req, resp) => {
    try {
        return resp.send('OK2');
    }
    catch (err) {
        return resp.status(400).send(err);
    }
});

module.exports = (app) => app.use('/account', router);