const mongoose = require("mongoose"),
    contactSchema = mongoose.Schema({
        name: String,
        email: String
    });

module.exports = mongoose.model("Contact", contactSchema);