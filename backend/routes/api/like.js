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
        console.log(post);

        if(post)
        {

            let likes = post.likes;
            const liked_user_index = likes.indexOf(mon.Types.ObjectId(req.user.id));
            console.log(likes);
            let message="";
            if(!likes||liked_user_index==-1)
            {
                likes.push(mon.Types.ObjectId(req.user.id));
                console.log(likes);
                message="Liked";
            }
            else
            {
                console.log(liked_user_index);
                likes.splice(liked_user_index,1);
                message="Unliked";
            }
            await posts.findByIdAndUpdate(req.params.postID,{likes:likes});
            res.status(200).json({msg:message});
        }
        else
        {
            return res.status(400).json({msg:"Bad Request"});
        }

    }
    catch (e) {
        res.status(500).json({errors:e,msg:"We got an error in the server"});
        console.log(e);
    }
})

module.exports=router;