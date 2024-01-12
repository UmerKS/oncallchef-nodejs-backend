const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const salt = 3;
const Chef = require("../models/chef");


//create chef /signIn
router.post('/create', async (req, res) => {
    let b = req.body;
    console.log("======1223")
    let chefdata = await Chef.findOne({ email: b.email });
    console.log(chefdata, "=======20")
    if (!chefdata) {
        b.password = await bcrypt.hash(b.password, salt);
        let data = await new Chef(req.body).save();
        res.json({ status: 1, data });
    } else {
        res.json({ status: 0, message: 'Email already exist' });
    }
});

//logIn chef
router.post('/login', async (req, res) => {
    try {
        let b = req.body;
        let data = await Chef.findOne({ email: b.email, });
        console.log(data, "-------34");
        let hashps = await bcrypt.compare(b.password, data.password);
        console.log(data && hashps, "-------35");
        if (data && hashps) {
            data.password = undefined
            res.json({ status: 1, data });
            if (data.fcmTokens.indexOf(b.fcm) == -1) {
                await Chef.updateOne({ _id: data._id }, { $push: { fcmTokens: b.fcm } });
            }
        } else {
            res.json({ status: 0, message: 'Email not exist' });
        }
    } catch (err) {
        console.log('on Data');
    }
});

//update School
// router.post('/update/:id', async (req, res) => {
//     let data = await School.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     res.json({ status: 1, data });
// });

router.post('/update', async (req, res) => {
    console.log(req.body);
    let data = await Chef.findByIdAndUpdate(req.body._id, req.body, { new: true })
    console.log(data, "===========53")
    if (data)
        res.json({ status: 1, data });
    else
        res.json({ status: 1, message: "No Data" })
});

//get all chef
router.get('/all', async (req, res) => {
    let data = await Chef.find();
    res.json({ status: 1, data });
});

//get one chef
router.get('/one/:id', async (req, res) => {
    let data = await Chef.findOne({ _id: req.params.id });
    res.json({ status: 1, data: data });
});

//delete
router.delete("/detele/:id", async (req, res) => {
    let data = await Chef.findByIdAndDelete();
    res.json({ status: 1, data });
});

// all School with Childern
// router.get('/allschoolwithchildren', async (req, res) => {
//     let data = await School.find();
//     for (let i = 0; i < data.length; i++) {
//         let chils = await Children.find({ schoolId: data[i]._id });
//         data[i].childrens = chils;
//     }
//     res.json({ status: 1, data, });
// });

// School With Children
// router.get('/allwithchildren', async (req, res) => {
// let data = await School.find();
// data = JSON.parse(JSON.stringify(data));
// for (let i = 0; i < data.length; i++) {
// let child = await Children.find({ schoolId: data[i]._id });
// data[i].schoolId = child;
// }
// res.json({ status: 1, data });
// });

module.exports = router;