const express = require("express");
const router = express.Router();
const User = require("../models/User"); // User model import
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt=require("jsonwebtoken"); // ye isiliye kr rhe taki we can cretae a authorization token on server side
const jwtsecretkey="mynameislakahn5";
// JSON parsing middleware for this router
router.use(express.json());

// Signup route
router.post("/createuser", [body('email').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10); // Corrected method
        const securedpassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            name: req.body.name,
            password: securedpassword,
            location: req.body.location,
            email: req.body.email
        });

        res.json({ success: true, user: newUser });
    } catch (error) {
        console.error("Error in creating user:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Login route
router.post("/loginuser", [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password); // Compare hashed passwords
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,jwtsecretkey)
        res.json({ success: true, message: 'Login successful', user: user,authToken:authToken });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;

