const keys = require('./keys.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 
//checking if request body is valid
const checkIfEmpty = requestBody => {
    const values = Object.values(requestBody);
    let isEmpty = values.filter(el => !el);
    return {
      isValid: isEmpty.length > 0 ? false : true
    };
  };

const hashPassword = password => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            resolve(hashedPassword)
        }
        catch (e) {
            reject(false)
        }
    })
}

const verifyHash = (password, passwordHash) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isPasswordValid = await bcrypt.compare(password, passwordHash)
            resolve(isPasswordValid)
        }
        catch (e) {
            reject(false)
        }
    })
}

const signJwt = (userid, name) => {
    let token;
    try {
        const tokenData = {
            userid,
            name
        }
        token = jwt.sign(tokenData, keys.userJwtKey, {
            expiresIn: "1h"
        });
    }
    catch (e) {
        token = null
    }
    return token;
}

module.exports = {
    checkIfEmpty,
    hashPassword,
    verifyHash,
    signJwt
}