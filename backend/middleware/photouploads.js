const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"images");
    },
    filename: (req,file,cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,uniqueName+"-"+file.originalname);
    }
});

const upload = multer({storage:storage});

module.exports=upload;