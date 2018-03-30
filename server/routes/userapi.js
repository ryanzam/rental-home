const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const router = express.Router();

//user registration
router.post('/register', (req, res, next)=> {
    let user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password 
    });
    User.addUser(user, (err, user)=>{
        if (err) {
            res.json({message: "error registering :" + err});
        }
        else {
            res.json({message: "user registered successfully!!"})
        }
    });
});

//authentication
router.get('/authenticate', (req, res, next)=> {
    res.send("hello");
});


router.get('/register', (req, res, next)=> {
    res.send("hello");
});


router.get('/register', (req, res, next)=> {
    res.send("hello");
});


router.get('/register', (req, res, next)=> {
    res.send("hello");
});


module.exports = router;