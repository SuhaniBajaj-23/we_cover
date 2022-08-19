const express = require("express");
const router = express.Router();
const Items = require("./../models/Items");
const User = require("./../models/User");

//Add a item
router.post("/add", async (req, res) => {
  const { name,user,loc,desc,size,phone,type } = req.body;
  console.log(req.session.currentUser);
  try {
    var item = new Items({
      name,
      user:req.session.currentUser._id,
      phone,
      loc,
      type,
      size
    });
    await item.save();
    res.render("profile");
    User.findOneAndUpdate( {_id: req.session.currentUser._id}, 
        {$inc : {'credits' : 5}}, 
        {new: true}, 
       );

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});

//Get all items
router.get("/get",async (req,res) => {
    Items.find({}).then(function(items){
        res.json(items);
    });
})

//Get one item

router.get('/get/:name', function(req, res, next){
    Items.find({name:req.params.name}) .then(function(item){
        res.json(item);
    });
});

module.exports = router;