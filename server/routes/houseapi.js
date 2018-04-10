
const express = require("express");

const House = require("../models/houseModel");

const router = express.Router();


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
router.post('/create/:id', (req, res, next)=>{
    let house = new House({
        owner_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        availability: req.body.availability,
        rent: req.body.rent,
        location: req.body.location
    });

    house.save((err)=>{
        if (err) {
            res.json({message: "error saving new house :" + err});
            } else {
                res.json({message:"new house created!!", house:house});
            }
    });
    
});

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