const router = require('express').Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js');
const Cart = require('../models/Cart');

// Create Cart

router.post('/', verifyTokenAndAuth, async (req, res) => {
    const newCart = new Cart(req.body);
    
    try{
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
});


// Update Cart

router.put('/:id', verifyTokenAndAuth, async (req, res) => {
   try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true }
    );
    res.status(200).json(updatedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Delete cart item 

router.delete('/:id', verifyTokenAndAuth , async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Item has been deleted...");

    }catch(err) {
        res.status(500).json(err);
    }
});

// Get User Cart 

router.get('/find/:userid', async (req, res) => {
    try {
       const Cart = await Cart.find({userId: req.params.userid});
       res.status(200).json(Cart);

    }catch(err) {
        res.status(500).json(err);
    }
});

// Get All 

router.get('/', verifyTokenAndAdmin , async (req, res) => {
    try {
       const Cart = await Cart.find();
       res.status(200).json(Cart);

    }catch(err) {
        res.status(500).json(err);
    }
})


module.exports = router;