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

    User.getUserByEmail(user.email, (err, existingUser)=>{
        if (err) throw err;
        if(!existingUser) { 
            User.addUser(user, (err, user)=>{
                if (err) {
                    res.json({sucess: false, message: "error registering :" + err});
                }
                else {
                    res.json({sucess: true, message: "user registered successfully!! You can sign in now!!"})
                }
            });
        } else {
            return res.json({sucess: false, message: "Email exists! Please use a new valid email"})
        };
    });

    
});

//get user 
router.get('/getuser/:id', (req, res, next)=>{
    const userid = req.params.id;
    User.getUserById(userid, (err, user)=>{
        if (err) throw err;
        res.json(user);
        });
    });

//authentication
router.post('/authenticate', (req, res, next)=> {
    const email = req.body.email;
    const password =req.body.password;

    User.getUserByEmail(email, (err, user)=> {
        if (user == null || user == undefined){
            return res.json({success: false, message: "Invalid Email/Password! "});
        }
        if (err ) {
            res.json({success: false, message: "error :"+ err});
        }
        if(!email){
            return res.json({success:false, message: "Email is not found!!"});
        }
        User.comparePass(password, user.password, (err, pwMatch)=>{
            if (err) throw err;
            if (pwMatch){
                const token = jwt.sign(user.toJSON(), secret, {
                    expiresIn: 86400
                });
                res.json({
                    success:true,
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
                return res.json({success:false, message: "Incorrect Password!!"});
            }
        });
    });
});


router.get('/account', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
    res.json({user: req.user});
}); 

router.put('/accountupdate/:id', (req, res, next)=>{
    const name= req.body.name;
    const phone = req.body.phone;
    const userid = req.params.id;

    if(!name || !phone) {
        return res.json({sucess: "false", message: "Nothing updated!!"})
    }
    else {
        User.getUserById(userid, (err, user)=>{
            if (err) throw err;
            if(user){
                user.name = name;
                user.phone = phone;
            }
            user.save((err)=>{
                if (err) throw err;
                else {
                    return res.json({sucess: "true", message: "User account details updated successfully!!"})
                }
            });
        });
    }
});


module.exports = router;