const router = require('express').Router();
const Admin = require('../models/admin');
const User = require('../models/users');
const { hashPassword, verifyHash, signJwt } = require('../config/functions');

router.post('/register', async (req, res) => {
    try {
        const body = req.body;
        body.password = await hashPassword(body.password);
        await new Admin(body).save();
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

router.get('/users', async (req, res) => {
    try {
        const userList = await User.find({}, { password: 0, __v: 0 });
        if (userList) {
            res.status(200).send(userList);
        } else {
            res.status(200).send({ msg: 'Error Listing Users' });
        }
    } catch (error) {
        console.log(error.message || 'Internal Server Error');
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const response = await User.deleteOne({ _id });
        if (response.deletedCount == 1) {
            res.status(200).send({ msg: 'User Deleted' });
        } else {
            res.status(202).send({ msg: 'Error Deleting User' });
        }
    } catch (error) {
        console.log(error.message || 'Internal Server Error');
    }
});

router.patch('/block/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let blocked = null;
        const userData = await User.findOne({ _id: id }, { password: 0, __v: 0 });
        if (userData) {
            blocked = !userData.block;
            const updateBlockStatus = await User.updateOne({ _id: id }, { block: blocked });
            if (updateBlockStatus.nModified === 1) {
                res.status(200).send({ msg: `${userData.name} Blocked` });
            } else {
                res.status(201).send({ msg: `Error blocking user.` });
            }
        } else {
            res.status(201).send({ msg: 'User not found' });
        }
    } catch (error) {
        console.log(error.message || 'Internal Server Error');
    }
});

module.exports = router;