const User = require('../models/User');
const CryptoJS = require('crypto-js');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// Register Function

router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        img: req.body.img
    });

    try {

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Login Function

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json("Wrong Email!");
        }

        const encryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const decryptedPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== req.body.password) {
            return res.status(401).json("Wrong Password!");
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;