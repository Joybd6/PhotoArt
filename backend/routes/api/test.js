const express = require("express")
const router = express.Router();
const jwtAuthenticate = require("../../middleware/jwtAuthentication");
const user = require("../../models/Users");

router.get("/",jwtAuthenticate,async function (req, res) {

        const userData = await user.findById(req.user.id);
        console.log(userData);
        res.status(200).json({ msg: "Hello World" });
    });


module.exports=router;