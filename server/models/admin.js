const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
    user: String,
    password: String
});

module.exports = new model('admin', AdminSchema);