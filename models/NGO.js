
var mongoose = require("mongoose");
var NGOSchema = new mongoose.Schema(
  {
    name: {type:String,
           required:true
    },
    password: {type:String,
               required:true},
    email: {type:String,
                required:true},
    type: String,
    phone: String,
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("ngo", NGOSchema);