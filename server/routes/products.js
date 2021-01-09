const router = require('express').Router();
const Product = require('../models/products');
const { userAuthCheck } = require('../config/middleware');
const { uploadProductImage } = require('../config/multer');
const { checkIfEmpty } = require('../config/functions');

router.post("/photo", async (req, res) => {
    try {
        uploadProductImage(req, res, async (err) => {
            if (err) console.log("Multer Errror", err);
            else {
                if (req.file == undefined) {
                    res.status(200).send({
                        msg: "Error uploading Image",
                    });
                } else {
                    res.status(200).send({
                        file: req.file.path,
                    });
                }
            }
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.send({
            code: 500,
            msg: "Internal Server Error",
        });
    }
});

router.post('/product', async (req, res) => {
    try {
        const body = req.body;
        const { isValid } = checkIfEmpty(body);
        if (isValid) {
            const productData = new Product(req.body);
            const savedProduct = await productData.save();
            if (savedProduct) {
                res.status(200).send({
                    msg: 'Product Added'
                });
            } else {
                res.status(202).send({
                    msg: 'Error product not added'
                })
            }
        } else {
            console.log('there should be error')
            res.status(202).send({
                msg: 'Missing product details'
            })
        }
    } catch (error) {
        console.log('Error', error.message);
    }
});




module.exports = router;