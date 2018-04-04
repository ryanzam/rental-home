
const bodyParser = require("body-parser");
const express = require("express");
const config = require("./config/dbConfig");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

//APIs
const user = require("./server/routes/userapi");
const house = require("./server/routes/houseapi");



//port
const port = process.env.PORT || '3000';
app.set("port", port);

//enable cors from angular
app.use(function(req, res, next) {  
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });


//mongodb server connect
mongoose.connect(config.database);
mongoose.connection.on('connected', function() {
    console.log("database connected :" + config.database);
})


//body-parser middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, "dist")));

//passport 
app.use(passport.initialize());
app.use(passport.session());

require("./config/passprt")(passport);

//view routes 
app.use("/user", user);
app.use("/house", house);

app.get("/", (req, res) => {
    res.send("Api running on localhost:"+port+"/api");
});


//server
app.listen(port, ()=>{
    console.log("server running on :" +port);
});

