require('dotenv').config()
const express= require("express");
const app = express();
const bodyparser=require("body-parser");
const connectDB= require("./config/db");
const jwtVerify= require("./middleware/jwtAuthentication");
const multer = require("multer");


app.use(express.json({extended:false}));
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Methods',"*");
  next();
}
app.use(allowCrossDomain);
connectDB();
app.listen(process.env.PORT,()=>console.log("Listening on "+process.env.PORT));


//Routes
app.use("/api/signup/",require("./routes/api/singup"));
app.use("/api/auth/",require("./routes/api/auth"));
app.use("/api/upload",require("./routes/api/upload"));
app.use("/api/test/",require("./routes/api/test"));
app.use("/api/delete/",require("./routes/api/delete"));
app.use("/api/getImage/",require("./routes/api/getImage"));
app.use("/api/like/",require("./routes/api/like"));
app.use("/api/toggleAccess/",require("./routes/api/toggleAccess"));
app.use("/api/getMyPost",require("./routes/api/getMyPost"));
app.use("/api/publicPost/",require("./routes/api/publicPost"));
app.get("/",(req,res)=>{
    res.status(200).json({msg:"Hello World"});
})
