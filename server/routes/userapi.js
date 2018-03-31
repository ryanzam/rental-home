const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const secret = "ramzan";

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
router.post('/authenticate', (req, res, next)=> {
    const email = req.body.email;
    const password =req.body.password;

    User.getUserByEmail(email, (err, user)=> {
        if (err){
            res.json({message: "error :"+ err});
        }
        if(!email){
            return res.json({message: "Email is not found!!"});
        }
        User.comparePass(password, user.password, (err, pwMatch)=>{
            if (err) throw err;
            if (pwMatch){
                const token = jwt.sign(user.toJSON(), secret, {
                    expiresIn: 86400
                });
                res.json({
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        phone: user.phone,
                        email: user.email
                    }
                });
            }
            else {
                return res.json({message: "Incorrect Password!!"});
            }
        });
    });
});


router.get('/account', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
    res.json({user: req.user});
}); 




module.exports = router;