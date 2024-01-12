const mongoose = require("mongoose");


const chefSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phonenumber: Number,
    image: String,
    fcmTokens: Array,
    status: String,
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },


}, { timestamps: true })

// create a new Collection using this model

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;
