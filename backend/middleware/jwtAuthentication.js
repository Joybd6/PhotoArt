require("dotenv").config();
const user = require("../models/Users");
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/Users");

const jwtVerify= async (req,res,next) => {
    const token = req.headers["x-access-token"] || req.params.token;

    if(!token)
    {
        return res.status(403).json({msg:"Authentication Failed"});
    }

    try {
        const decodedToken = jwt.verify(token,process.env.JsonSecret);
        const userData= await user.findOne({email:decodedToken.email});
        if(!userData)
        {
            return res.status(403).json({msg:"Authentication Failed"});
        }
        req.user=decodedToken;
    }
    catch (e) {
        return res.status(403).json({msg:"Authentication Failed"});
    }
    next();

}

module.exports = jwtVerify