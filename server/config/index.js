/* 
* Production and Development keys are seperated according to condition.
*/
const keys = {};
if (process.env.ENVIRONMENT === 'development') {
    keys.client = process.env.LOCAL_CLIENT_PATH;
    keys.server = process.env.LOCAL_SERVER_PATH;
} else {
    keys.client = process.env.LIVE_CLIENT_PATH;
    keys.server = process.env.LIVE_SERVER_PATH;
}
keys.port = process.env.PORT || 3001;
keys.dbAddress = process.env.MONGO_URL;
keys.usersecret = process.env.USER_SECRET_KEY;
module.exports = keys;