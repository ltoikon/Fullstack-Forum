/*  Routes should use try catch format (or promises) instead of using callback function.
    This is because later versions of mongoose (7.0 ->) has deprecated callback functions.
    Fix this later!
*/

/* Authentication and authorization*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
require('dotenv').config();



//Log in as a user
router.post('/login',
    body("username").trim().escape(), //sanitating input
    (req, res, next) => {
        let { username, password } = req.body;
        User.findOne({ username }, (err, user) => {
            if(err) throw err;
            //password check
            if(user) {
                bcrypt.compare(password, user.password, function(err, isMatch){
                    if(err) throw err;
                    //creating jwt for user
                    if(isMatch) {
                        const payload = {id: user._id, username: user.username}
                        let token = jwt.sign(payload, process.env.SECRET, {expiresIn: 7200})
                        res.json({success: true, token});
                    } else {
                        return res.status(401).json({message:"Invalid login information"});
                    }
                })
            } else {
                return res.status(403).json({message:"User not found"})
            }
        })

})

//Add user to the site
router.post('/register', 
    body("username").trim().escape(), //sanitating input
    (req, res, next) => {
        //error handling
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
        let { username, password } = req.body;
        //check if user with same username exists already
        User.findOne({ username: username }, (err, user) => {
            if(err) throw err;
            if(!user) {
                //hashing password and saving new information
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if(err) throw err;
                    new User({
                        username,
                        password: hashedPassword
                    }).save((err, ok) => {
                        if (err) throw err;
                        return res.status(201).json({message:"New user registered"})
                    })
                })

            } else {
                return res.status(403).json({message:"User already exists"})
            }
        })
        
    
})

module.exports = router;