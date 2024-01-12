const mongoose = require("mongoose");

const dishSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    instc: String,
    image: String,
    status: String,
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },

})

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;