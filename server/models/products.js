const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

module.exports = new model('products', productSchema);