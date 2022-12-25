const express = require("express");
const router = express.Router();
const jwtAuthenticate = require("../../middleware/jwtAuthentication");
const users = require("../../models/Users");
const posts = require("../../models/Posts");
const mon = require("mongoose");

router.get("/",jwtAuthenticate,async (req,res) => {
    try {
        let post = await posts.find({user:{$ne:mon.Types.ObjectId(req.user.id)}});

        post = post.map((dat)=> {
            is_liked = dat.likes.indexOf(mon.Types.ObjectId(req.user.id));
            console.log(is_liked);
            let liked;
            if(is_liked==-1)
            {
                liked=false;
            }
            else
            {
                liked=true;
            }
            dat={...dat.toObject(),liked:liked};
            
            return dat;
        });

        for(let i=0;i<post.length;i++)
        {
            const userData=await users.findById(post[i].user.toString())
            post[i].name=userData.name;
        }
        //console.log(post);
        res.status(200).json(post);
    }
    catch(e) {
        console.log(e);
        res.status(500).json({errors:e,msg:"We got an error in the server"});
    }
});

module.exports = router;