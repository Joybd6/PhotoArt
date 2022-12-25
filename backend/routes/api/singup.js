const router=require("express").Router();
const user = require("../../models/Users");
const bcrypt= require("bcryptjs");
const { body, validationResult } = require('express-validator');

router.post("/", body("email").isEmail(),body("password").isLength({min:8}),body("name").notEmpty(), async (req,res)=> {

    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        res.status(400).json({errors:errors.array(),msg:"User is not created"});
    }
    else
    {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const userData={
            name:req.body.name,
            email:req.body.email,
            password:hash
        };

        const len= await user.findOne({email:req.body.email});
        
        if(!len||len==0)
        {
            try {
                await user.create(userData);
            }
            catch(e)
            {
                res.status(500).json({msg:"Server Error",errors:e});
            }

            res.status(200).json({msg:"User is created"});
        }
        else
        {
            res.status(400).json({msg:"User Exist"});
        }

    }

})


module.exports=router;