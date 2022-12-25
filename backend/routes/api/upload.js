const express = require("express");
const router = express.Router();
const jwtAuthenticate = require("../../middleware/jwtAuthentication");
const multer = require("multer");
const upload = require("../../middleware/photouploads");
const posts = require("../../models/Posts");
const users = require("../../models/Users");
const { body } = require("express-validator");

router.post("/",jwtAuthenticate,upload.single("uploaded-image"),async (req,res)=> {
    if(!req.body.title)
    {
        return res.status(400).json({msg:"Title field required"});
    }

    try {
        const userData = await users.findById(req.user.id);
        const postData = {
            user: userData,
            title: req.body.title,
            imageURL: req.file.path,
            access: true
        }

        await posts.create(postData);
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({errors:e,msg:"Got problem in the server"});
    }
    res.status(200).json({msg:"Uploaded"});
});

module.exports = router;