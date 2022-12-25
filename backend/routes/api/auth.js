const router=require("express").Router();
const user = require("../../models/Users");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

router.post("/",body("email").isEmail(),body("password").notEmpty(), async (req,res)=> {
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(401).json({errors:errors.array(),msg:"Credential Invalid"});
    }
    else
    {
        const userData= await user.findOne({email:req.body.email});
        if(userData && (await bcrypt.compare(req.body.password,userData.password)))
        {
            const sendUser={
                id:userData.id,
                name:userData.name,
                email:userData.email,
            }
            const token = jwt.sign(sendUser,process.env.JsonSecret,{expiresIn:"2h"});
            sendUser.token=token;
            return res.status(200).json(sendUser);
        }

        res.status(400).json({msg:"Credential Invalid"});
    }
})


module.exports=router;