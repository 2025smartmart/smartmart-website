const mongoose = require("mongoose");

const connectdb = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error(err);
    }

}
module.exports = connectdb;