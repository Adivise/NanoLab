const mongoose = require('mongoose');
const { MONGO_URI } = require('../settings/config.js');

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`[+] MongoDB is ready!`);
    } catch (error) {
        console.log(error);
    }
}