const express = require("express");
const Announcement = require("../models/announcement");
const Chef = require("../models/chef");
const notifi = require("../notifications/notification")


const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        let b = req.body;
        let data = await new Announcement(b).save();
        //console.log(b, "=====================12");
        res.json({ status: 1, data });
        notifi(b["title"], b["body"], "Chef", b.chefId._id)
    } catch (err) { console.log(err) }
});

router.post('/update', async (req, res) => {
    // console.log(req.body);
    let b = req.body;
    let data = await Announcement.findByIdAndUpdate(req.body._id, req.body, { new: true })
    //  console.log(data, "===========53")
    if (data)
        res.json({ status: 1, data });
    else
        res.json({ status: 1, message: "No Data" })
    notifi(b["title"], b["body"], "Chef", b.chefId._id)

});
router.post('/updateStaus', async (req, res) => {
    let b = req.body;
    let data = await Announcement.findByIdAndUpdate(req.body._id, req.body, { new: true })
    if (data)
        res.json({ status: 1, data });
    else
        res.json({ status: 1, message: "No Data" })
});

router.get('/getAllannouncement/:id', async (req, res) => {
    let data = await Announcement.find({ usertId: req.params.id, })
    res.json({ status: 1, data, });

});
router.get('/getAllfromParent/:id', async (req, res) => {
    let data = await Announcement.find({ chidId: req.params.id, }).populate("dishId")
    res.json({ status: 1, data, });

});

router.get('/getAnnouncementDate/:id', async (req, res) => {
    let data = await Announcement.find({ chefId: req.params.id, updatedAt })
    res.json({ status: 1, data, });
});
module.exports = router;