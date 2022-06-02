
const mongoose = require("mongoose");

const CreateHoyoverse = new mongoose.Schema({
    user_id: String,
    hyv_cookie: String,
    hyv_uid: String,
});

module.exports = mongoose.model("Hoyoverse", CreateHoyoverse);