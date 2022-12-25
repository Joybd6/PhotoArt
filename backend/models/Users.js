const mon = require("mongoose");

const UserSchema = new mon.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
});

const User=mon.model("user",UserSchema);

module.exports=User;