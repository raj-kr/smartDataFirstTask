const Keys = require('./index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pathDirectory = require('path');

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
        token = jwt.sign(tokenData, Keys.usersecret, {
            expiresIn: "1h"
        });
    }
    catch (e) {
        token = null
    }
    return token;
}

const verifyJwt = token => {
    return new Promise(async (resolve, reject) => {
        try {
            const isTokenValid = jwt.verify(token, userJwtKey)
            if (isTokenValid) {
                resolve(isTokenValid)
            }
        }
        catch (e) {
            reject(false)
        }
    });
}

const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(
      pathDirectory.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  };

module.exports = {
    checkIfEmpty,
    hashPassword,
    verifyHash,
    signJwt,
    verifyJwt,
    checkFileType
}