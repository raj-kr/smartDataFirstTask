const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    password: String,
    email: String
});

module.exports = new model('users', userSchema);