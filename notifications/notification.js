const FCM = require("fcm-node");
const Notification = require("../models/notification");
const Chef = require("../models/Chef");
const User = require("../models/user");
const serverKeyS = process.env.SERVER_KEY_CHEF;
const serverKeyP = process.env.SERVER_KEY_USER;
const fcmChef = new FCM(serverKeyS);
const fcmUser = new FCM(serverKeyP);

module.exports = async function (title = "", body = "", type = "Chef", _id) {
    let notification;
    console.log("Notifitcation Send====================12");
    let fcms = [];
    if (type == "Chef") {
        notification = await new Notification({ title, body, chefId: _id }).save();
        //  console.log(notification, "=--=-=-=-=-=-==-=-=-=-=-=-=-=-==-=--=-=-=")
        let user = await Chef.findOne({ _id, status: { $nin: "-1" } }, { fcmTokens: 1, });
        fcms = user.fcmTokens;

    }
    else {
        let data = await User.find({ status: "1" }, { fcmTokens: 1, });
        //  console.log(data, "1111111")
        for (let i = 0; i < data.length; i++) {
            //  console.log(data[i].fcmTokens, "===========23")
            fcms = [...fcms, ...data[i].fcmTokens];

            notification = await new Notification({ title, body, userId: data[i]._id }).save();
        }
    }
    //    console.log(fcms, "============27");


    for (let i = 0; i < fcms.length; i++) {
        if (type == "Chef")
            fcmChef.send({
                to: fcms[i],
                notification: { title: title, body, }
            }, function (err, response) { });
        else
            fcmUser.send({
                to: fcms[i],
                notification: { title: title, body, }
            }, function (err, response) { });
    }

}


