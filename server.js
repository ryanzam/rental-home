
const bodyParser = require("body-parser");
const express = require("express");
const config = require("./config/dbConfig");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

//APIs
const user = require("./server/routes/userapi");


//port
const port = process.env.PORT || '3000';
app.set("port", port);

//use cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//mongodb server connect
mongoose.connect(config.database);
mongoose.connection.on('connected', function() {
    console.log("database connected :" + config.database);
})


//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, "dist")));

//view routes 
app.use("/user", user);

app.get("/", (req, res) => {
    res.send("Api running on localhost:"+port+"/api");
});


//server
app.listen(port, ()=>{
    console.log("server running on :" +port);
});

