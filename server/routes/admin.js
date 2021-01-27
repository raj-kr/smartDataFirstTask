const router = require('express').Router();
const Admin = require('../models/admin');
const { hashPassword, verifyHash, signJwt } = require('../config/functions');

router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        body.password = await hashPassword(body.password);
        const response = await new Admin(body).save();
    } catch (error) {
        console.log(error.message || 'Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        let payload, userFound, userVerified, token;
        payload = req.body;

        userFound = await Admin.findOne({ user: payload.user }, { __v: 0 });
        if (userFound) {
            userVerified = await verifyHash(payload.password, userFound.password);
            if (userVerified) {
                token = signJwt(userFound._id, payload.user);
                res.status(200).send({ token });
            } else {
                res.status(202).send({ msg: 'Invalid Credentials' });
            }
        } else {
            res.status(202).send({ msg: 'User not found' });
        }
    } catch (error) {
        console.log(error.message || 'Internal Server Error');
    }
});

module.exports = router;