const mongoose = require("mongoose");

const Created = new mongoose.Schema({
    user_id: String,
    hyv_cookie: String,
    hyv_uid: String,
});

module.exports = mongoose.model("Hoyolab", Created);