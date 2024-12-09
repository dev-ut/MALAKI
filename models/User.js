const mongoose = require("mongoose");

// Ab yahan hum schema taiyar kar rahe hain login page ke liye jo fields required hain
// const { Schema }=mongoose;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: { // Colon yahan add karna tha
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);