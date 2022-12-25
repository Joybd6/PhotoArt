const mon= require("mongoose");


const connectDB= async ()=> {
    try {
        const url="mongodb+srv://joybd6:test102@cluster0.hihfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        await mon.connect(url);
        console.log("Database Connected");
    }
    catch (err) {

        console.log("There was an error while connecting to database");
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB;