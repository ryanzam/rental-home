
const express = require("express");

const House = require("../models/houseModel");

const router = express.Router();
//multer imports for image uploading
const multer  = require('multer');

//storage for image, multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ file.originalname);
      console.log(file);
    }
  });

  const fileFilter = (req,file, cb) =>{
        // To accept this file pass `false`, like so:
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        } else {
            // To reject the file pass `true`, like so:
            cb(null, false);
        }
  };

  const upload = multer({ storage: storage, limits: {
        fileSize: 1024*1024*5
      },
      fileFilter: fileFilter
 });

//get rental house lists
router.get('/gethouse', (req, res, next)=>{
   House.find((err, house)=>{
    if (err) return next(err);
    res.json(house);
   })
});

//get a house
router.get('/gethouse/:id', (req, res, next)=>{
    House.getHouseById(req.params.id, (err,house)=> {
        if(err) return next(err);
        res.json(house);
    });
})

//get user's house
router.get('/getuserhouse/:id', (req, res, next)=>{
    House.getHouseByOwnerId(req.params.id, (err, house)=>{
        if (err) return next(err);
        res.json(house);
    })
});

//add/post a new house
router.post('/create/:id', upload.single('houseImage'), (req, res, next)=>{
    console.log(req.file);

    let house = new House({
        owner_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        availability: req.body.availability,
        rent: req.body.rent,
        location: req.body.location,
        houseImage: req.file.path
    });

    house.save((err)=>{
        if (err) {
            res.json({message: "error saving new house :" + err});
            } else {
                res.json({message:"new house created!!", house:house});
            }
    });
    
});

//image for houses


//update a house
router.put('/update/:id', (req, res, next)=>{
    House.getHouseById(req.body._id,(err, house)=>{
        if (err) return next(err);
        if(house) {
            house.title = req.body.title,
            house.description = req.body.description,
            house.availability = req.body.availability,
            house.rent = req.body.rent,
            house.location = req.body.location
        }
        house.save((err)=>{
            if (err) {
                res.json({message: "error updating new house :" + err});
                } else {
                    res.json({message:"The house has been updated!!", house:house});
                }
        });
}) });

//delete a house
router.delete('/delete/:id', (req, res, next)=>{
    House.findByIdAndRemove(req.params.id, (err, house)=>{
        if(err) return next(err);
        res.json({message: "House deleted!!", house: house});
    });

})

module.exports = router;