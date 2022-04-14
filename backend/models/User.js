const mongoose=require("mongoose");

const UserSchema =new mongoose.Schema({

     Username:{
       type:String,
       require:true,
     },
     email:{
       type:String,
       require:true,
     },
     password:{
       type:String,
       required:true,
     },

   },

   {
     timestamps:true
   }

);


module.exports =mongoose.model("User",UserSchema);
