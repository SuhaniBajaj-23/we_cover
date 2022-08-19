
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema(
  {
    name: {type:String,
           required:true 
    },
    password: {type:String,
               required:true},
    email: {type:String,
                required:true},
    phone: String,
    address: String,
    type: String,
    credits: Number,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("user", UserSchema);