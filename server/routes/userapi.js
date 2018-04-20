const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');


const User = require("../models/userModel");
const Token = require("../models/tokenModel");
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
                    const token = new Token({userId: user._id, token : jwt.sign(user.toJSON(), secret, {expiresIn: 86400 })})
                    console.log(token);
                    token.save(err=>{
                        if (err) throw err;
                        // Send the email
                        const transporter = nodemailer.createTransport({
                            service: "mail.ee",
                            auth: {
                                user: 'thunder_strom@mail.ee',
                                pass: 'faber177'
                            }, 
                            tls:{
                                rejectUnauthorized: false
                            }
                        });
                    
                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"Rental House Admin 👻" <info@rentalhouse.com>', // sender address
                            to: user.email, // list of receivers
                            subject: 'Verify your Email ✔', // Subject line
                            text: 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' 
                                    + req.headers.host + '\/confirmation\/' + token.token + '.\n' , // plain text body
                            html: '<b>Hello world?</b>' // html body
                        };
                    
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        });
                    })
                    res.json({sucess: true, message: "A verification email has been sent to "+ user.email + " to verify."})
                }
            });
        } else {
            return res.json({sucess: false, message: "Email already exists! Please use a new valid email"})
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
            if(!user.isEmailVerified) {
                return res.json({success:false, message:"Please check your email and Verify your email."});
            }
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

//email confirmation
router.post('/confirmation/:token',  (req, res, next)=> { 
    const token = req.params.token;
    Token.getTokenByToken( token, (err, token)=>{
        if (err) throw err;
        if(!token) {
            return res.json({success:false, message:"Token may have expired!"})
        }
        User.findOne({_id:token.userId}, (err, user)=>{
            if (err) throw err;
            if (!user) {
                return res.json({message: "User associated with this token not found!"});
            }
            if(user.isEmailVerified) {
                return res.json({message: "User has already been verified"});
            }
            user.isEmailVerified = true;
            user.save(err =>{
                if (err) throw err;
                res.json({message: "Your email has been verified! You can log in"});
            });
        })
    })
    
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