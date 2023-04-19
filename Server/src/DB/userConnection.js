const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const URI = "mongodb://localhost:27017/MERN_15_April";

const root = mongoose.connect(URI).
then(()=>{
    console.log("Database Connected Successfully.. 🔥🔥");
})
.catch((err)=>{
    console.log("Error Occured..");
    console.log(err);
});



