const express = require("express");
const router = express.Router();
const posts = require("../../models/Posts");
const users = require("../../models/Users");
const jwtAuthenticate = require("../../middleware/jwtAuthentication")
const mon = require("mongoose");
router.post("/:postID",jwtAuthenticate,async (req,res)=> {
    if(!req.params.postID)
    {
        return res.status(400).json({msg:"Bad Request"});
    }

    try {
        const post = await posts.findById(req.params.postID);

        if(post&&req.user.id==post.user.toString())
        {

            const postAccess = !post.access;
            const message= postAccess?"Post is Public now":"Post is Private now";
            await posts.findByIdAndUpdate(req.params.postID,{access:postAccess});
            res.status(200).json({msg:message});
        }
        else
        {
            return res.status(400).json({msg:"Bad Request Bro"});
        }

    }
    catch (e) {
        res.status(500).json({errors:e,msg:"We got an error in the server"});
        console.log(e);
    }
})

module.exports=router;