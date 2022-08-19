
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const session = require("express-session");
const itemRoutes = require("./routes/items");
const userRoutes = require('./routes/user');



const PORT = process.env.PORT || 5000;
//ConnectDb

const connect = mongoose
    .connect(process.env.MONGO_URI, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Mondo db connected...."))
    .catch((err) => console.log(err));
 

//Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(
  session({
    secret: "yoyo",
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/auth", authRoutes);
app.use("/item", itemRoutes);
app.use("/user",userRoutes)
app.get("/", (req, res) => {
  res.render("home");
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

