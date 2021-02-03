const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    block:{
        type:Boolean,
        default:false
    }
});

module.exports = new model('users', userSchema);