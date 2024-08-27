const router = require('express').Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js');
const Product = require('../models/Product');

// Create product

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    
    try{
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }
});


// Update Product

router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true }
    );
    res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Delete Product 

router.delete('/:id', verifyTokenAndAdmin , async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");

    }catch(err) {
        res.status(500).json(err);
    }
});

// Get Product 

router.get('/find/:id', async (req, res) => {
    try {
       const product = await Product.findById(req.params.id);
       res.status(200).json(product);

    }catch(err) {
        res.status(500).json(err);
    }
});

// Get All Product 

router.get('/allProduct' , async (req, res) => {
    const queryNew = req.query.new;
    const queryCat = req.query.category;

    try {
        let product;

        if(queryNew) {
            product = await Product.find().sort({ _id: -1}).limit(5);
        } 
        else if(queryCat) {
            product = await Product.find({
                category: {
                    $in: [queryCat],
                },
            });
        } 
        else {
            product = await Product.find();
        }

        res.status(200).json(product);

    }catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;