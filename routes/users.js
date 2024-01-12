const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = 3;
const User = require("../models/user");

//create create
router.post('/create', async (req, res) => {
    let b = req.body;
    console.log("======1223")
    let userdata = await User.findOne({ email: b.email });
    console.log(userdata, "=======12")
    if (!userdata) {
        b.password = await bcrypt.hash(b.password, salt);
        let data = await new User(req.body).save();
        res.json({ status: 1, data });
    } else {
        res.json({ status: 0, message: 'Email already exist' });
    }
});

//login user
router.post('/login', async (req, res) => {
    try {
        let b = req.body;
        let data = await User.findOne({ email: req.body.email });
        console.log(data, "-------34");
        let hashps = await bcrypt.compare(b.password, data.password);
        console.log(data && hashps, "-------35");
        if (data && hashps) {
            data.password = undefined
            res.json({ status: 1, data });
            if (data.fcmTokens.indexOf(b.fcm) == -1)
                await User.updateOne({ _id: data._id }, { $push: { fcmTokens: b.fcm } });
        } else {
            res.json({ status: 0, message: 'Email not exist' });
        }
    } catch (err) {
        console.log('on Data');
    }
});

//update user

router.post('/update', async (req, res) => {
    console.log(req.body);
    let data = await User.findByIdAndUpdate(req.body._id, req.body, { new: true })
    console.log(data, "===========53")
    if (data)
        res.json({ status: 1, data });
    else
        res.json({ status: 1, message: "No Data" })
});

//get all User
router.get('/all', async (req, res) => {
    let data = await User.find();
    res.json({ status: 1, data });
});

//get one user
router.get('/one/:id', async (req, res) => {
    let data = await User.findOne({ _id: req.params.id });
    res.json({ status: 1, data });
});

// delete 
router.delete("/detele/:id", async (req, res) => {
    let data = await User.findByIdAndDelete();
    res.json({ status: 1, data });
});

module.exports = router;