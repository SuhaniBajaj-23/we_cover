const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Ngo = require("./../models/NGO");
const bcrypt = require("bcryptjs");


router.get("/signup", (req, res) => {
res.render("signup");
}); 

router.post("/signup", async (req, res) => {
  const { name, email, password, type,phone,address } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    if (type === "user") {
      var user = new User({
        name,
        email,
        type,
        password: hashPassword,
        phone,
        address,
      });
      await user.save();
      
      req.session.currentUser = user;
      return res.redirect("/user/donate");
      // console.log(req.session.currentUser);
     
    } else if (type === "ngo") {
      var ngo = new Ngo({
        name,
        email,
        type,
        password: hashPassword,
        phone,
       
      });

      await ngo.save();
      req.session.currentUser = ngo;
      return res.redirect("/user/avail");
     
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});

router.post("/login", async (req, res) => {
  const { email, password, type } = req.body;

  console.log(req.body);
  try {
    if (type === "user") {
      const user = await User.findOne({ email });
      if (user) {
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
          return req.json({ msg: "Not Authorized!" });
        }
        
        // res.render("avail");
        
        req.session.currentUser = user;
        return res.redirect("/user/donate");
        // console.log(req.session.currentUser);
       
      } else {
        res.json({ msg: "Not Found!" });
      }
    } else if (type === "ngo") {
      const ngo = await Ngo.findOne({ email });
      if (ngo) {
        const isMatched = await bcrypt.compare(password, ngo.password);
        if (!isMatched) {
          return res.json({ msg: "Not Authorized!" });
        }
        
        req.session.currentUser = ngo;
        return res.redirect("/user/avail");
      } else {
        res.json({ msg: "Not Found!" });
      }
    }
  } catch (err) {
    console.log(err);
    res.send("Error!");
  }
});

router.get("/logout", (req, res) => {
  req.session.currentUser = null;
});

module.exports = router;