const express = require("express");
const morgan = require("morgan");
const app = express();
// require("dotenv").config();
require("./db/conn");
const port = process.env.PORT || 3010;

app.use(express.json({ limit: '50mb' }));
app.use(morgan("dev"))


// getting files
app.use("/uploads", express.static("uploads"));
// uploads files
app.use("/file", require("./routes/uploads"));



//Connection 
app.use("/user", require("./routes/users"));
app.use("/dish", require("./routes/dishs"));
app.use("/chef", require("./routes/chefs"));


app.listen(port, () => {
    console.log(`Connection is setup qt ${port}`)
})