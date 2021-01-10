const router = require('express').Router();
const Product = require('../models/products');
const { userAuthCheck } = require('../config/middleware');
const { uploadProductImage } = require('../config/multer');
const { checkIfEmpty } = require('../config/functions');

router.post("/photo", async (req, res) => {
    try {
        uploadProductImage(req, res, async (err) => {
            if (err) {
                res.status(200).send({
                    msg: err.message,
                });
            }
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

router.get('/product/page/:number', async (req, res) => {
    try {
        const { number } = req.params;
        const response = await Product.find({}, { __v: 0 }).skip((+number - 1) * 5)
            .limit(5);
        res.status(200).send({
            list: response
        });
    } catch (error) {
        console.log('Error:', error.message);
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Product.findOne({ _id: id }, { __v: 0 });
        if (response) {
            res.status(200).send({
                product: response
            })
        }
    } catch (error) {
        console.log('Error', error.message);
    }
});

router.patch('/product', async (req, res) => {
    try {
        const body = req.body;
        const response = await Product.updateOne({ _id: body._id }, body);
        if (response.n === 1) {
            res.status(200).send({
                msg: 'Product Updated'
            })
        } else {
            res.status(202).send({
                msg: 'Error Updating Product'
            })
        }
    } catch (error) {
        console.log('Error', error.message);
    }
});

router.get('/:search', async (req, res) => {
    try {
        const { search } = req.params;
        const response = await Product.find({ name: { $regex: search, $options: 'i' } });
        res.status(200).send({
            products: response
        });
    } catch (error) {
        console.log('Error', error.message);
    }
});

router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteResponse = await Product.deleteOne({ _id: id });
        if (deleteResponse.n === 1) {
            res.status(200).send({
                msg: 'Product Delete'
            });
        } else {
            res.status(201).send({
                msg: 'Error Deleting'
            });
        }
    } catch (error) {
        console.log('Error', error.message);
    }
});

module.exports = router;