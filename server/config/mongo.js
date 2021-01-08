const mongoose = require('mongoose');
const keys = require('./keys');

async function mongoConnect() {
    try {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(keys.dbAddress, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('Connected to Mongo database');
    }
    catch (e) {
        console.log(`Error connecting to mongo database ${e}`)
    }
}

module.exports = mongoConnect;