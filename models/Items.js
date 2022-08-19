const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  phone: {
    type: String,
    
  },
  loc: {
    type: String,
    required: true,
  },
  type: {
    type: String
   
  },
  size: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("item", ItemSchema);