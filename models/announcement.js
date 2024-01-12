const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({


    status: String,
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },

}, { timestamps: true })

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
