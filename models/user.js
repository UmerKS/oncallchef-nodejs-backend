const mongoose = require("mongoose");
//prant
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String,
    phonenumber: Number,
    status: String,
    image: String,
    age: String,
    fcmTokens: [],

}, { timestamps: true })
// create a new Collection using this model
const User = mongoose.model('User', userSchema);

module.exports = User;
