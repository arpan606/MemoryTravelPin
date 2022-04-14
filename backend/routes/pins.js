const express=require("express");
const bodyParser=require("body-parser");
const router=require("express").Router();
const Pin=require("../models/Pin");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

//Create a new  Pin

router.post("/",async (req,res)=>{


    const newPin= new Pin(req.body);
    try{

     const savedpin = await newPin.save();
     res.status(200).json(savedpin);
    }
    catch(err){
      res.status(500).json(err);
    }


});

// get all Pin

router.get("/",async function(req,res){

   try{

        const pins= await Pin.find();
        res.status(200).json(pins);

   }catch(err)
   {
     res.status(500).json(err);
   }


});


module.exports=router;
