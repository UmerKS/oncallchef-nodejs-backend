const { application } = require("express");

const express = require("express");
const router = express.Router();
// const multer = require("multer") 
// const upload = multer({dest:'/images/'}); 

const Dish = require("../models/dish");



//create dish

router.post('/create', async (req, res) => {
    var data = await new Dish(req.body).save();
    res.json({ status: 1, data: data });


});


//update user

router.post('/update/:id', async (req, res) => {

    var data = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json({ status: 1, data: data });

});

//get all users

router.get('/all', async (req, res) => {
    var data = await Dish.find();
    res.json({ status: 1, data: data });

});

router.get('/alldishwithchef/:id', async (req, res) => {
    let data = await Dish.find({ chefId: req.params.id }).populate("chefId")
    res.json({ status: 1, data });
});

router.delete('/delete/:_id', async (req, res) => {
    await Dish.updateOne({ _id: req.params._id }, { status: "-1" })
    res.json({ status: 1, message: "Deleted" });

});
// router.delete("/detele/:id", async (req, res) => {
//     let data = await Dish.findByIdAndDelete();
//     res.json({ status: 1, data });
// });




module.exports = router;