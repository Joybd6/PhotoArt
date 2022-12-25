const express = require("express")
const router = express.Router();
const jwtAuthenticate = require("../../middleware/jwtAuthentication");
const posts = require("../../models/Posts")
const fs = require("fs");

router.delete("/:postID",jwtAuthenticate,async (req,res)=> {
    if(req.params.postID)
    {
        try {
            const post = await posts.findById(req.params.postID);

            if(post)
            {
                if(req.user.id==post.user.toString()){
                    let ok = true;
                    const imageURL=post.imageURL;
                    fs.unlink(imageURL,(e)=>{
                        ok=false;
                        console.log(e);
                    });

                    if(!ok)
                    {
                        return res.status(500).json({msg:"We got an erron in the server"});
                    }

                    await posts.findByIdAndDelete(req.params.postID);

                    return res.status(200).json({msg:"Post is deleted"});
                }
                else
                {
                    return res.status(401).json({msg:"User is not authorized to delete this"});
                }
            }
            else
            {
                return res.status(400).json({msg:"Bad request"});
            }
        }
        catch (e) {
            res.status(500).json({msg:"We got an error in the server"});
        }
    }
    else{
        res.status(400).json({msg:"Bad request"});
    }
})


module.exports= router;