const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const pinRoute=require("./routes/pins");
const userRoute=require("./routes/users");
const cors=require('cors');






const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(cors());
app.use("/pins",pinRoute);
app.use("/users",userRoute);





app.listen(8000,function(req,res){
console.log("server started 8000 ");
});
