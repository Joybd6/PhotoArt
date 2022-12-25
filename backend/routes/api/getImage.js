const express = require("express");
const router = express.Router();
const posts = require("../../models/Posts");
const users = require("../../models/Users");
const jwtAuthenticate = require("../../middleware/jwtAuthentication");

router.get("/:token/:postID",jwtAuthenticate,async (req,res)=> {
    if(!req.params.postID)
    {
        return res.status(400).json({msg:"Bad Request"});
    }

    try{
        const post = await posts.findById(req.params.postID);
        if(post)
        {
            const imageURL= post.imageURL;

            const options = {
                root: "./"
            }
            res.status(200).sendFile(imageURL,options);
        }
        else
        {
            return res.status(400).json({msg:"Bad Request"});
        }
    }
    catch(e) {
        res.status(500).json({msg:"We got an error in the server"});
        console.log(e);
    }
});

module.exports=router;