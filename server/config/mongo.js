const mongoose = require('mongoose');
const Keys = require('./index');

async function mongoConnect() {
    try {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(Keys.dbAddress, {
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