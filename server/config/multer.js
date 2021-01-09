const multer = require('multer');
const pathDirectory = require('path');
const { checkFileType } = require('./functions');

const productStorage = multer.diskStorage({
    destination: './public/',
    filename: async (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + pathDirectory.extname(file.originalname));
    }
});

const uploadProductImage = multer({
    storage: productStorage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file');

module.exports = {
    uploadProductImage
}