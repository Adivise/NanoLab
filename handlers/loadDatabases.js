const mongoose = require('mongoose');
const { MONGO_URI } = require('../settings/config.js');

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.log(error);
    }
}