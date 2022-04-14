
const router=require("express").Router();
const User=require("../models/User.js");

//Register

router.post("/register",async function(req,res){

    try{

      const checkUser=await User.findOne({email:req.body.email});

       if(checkUser)
       {
          res.status(200).json({status:false,message:"Email Id already exist"});
          return;
       }

     // create new User
      const newUser=new User({
        Username:req.body.username,
        email:req.body.email,
        password:req.body.password,
      });

      console.log(newUser);
     // save user and send response

       const user=await newUser.save();
       res.status(200).json({_id:user._id,status:true,message:"Successfull"});

    }catch(err)
    {
      res.status(500).json(err);
    }


});

// get all Pin

router.post("/login",async function(req,res){

  try{
  //find user
   const user=await User.findOne({email:req.body.email});

   if(!user)
   {
      res.status(200).json({status:false,message:"Invalid Email Id"});
    }else if(user)
    {
    //validate password
     if(req.body.password===user.password)
     {
        res.status(200).json({_id:user._id,status:true,message:"Successfull Login "});
     }else
     {
      res.status(200).json({status:false,message:"wrong email id or password"});
     }
  }

  }catch(err)
  {
    res.status(500).json(err);
  }
});


module.exports=router;
