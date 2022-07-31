require("dotenv").config();

module.exports = {
    /// Bot Discord
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    CLIENT_SECRET: process.env.CLIENT_SECRET || "YOUR_CLIENT_SECRENT",  // your client secret
    DEV_ID: [], /// don't put only for development

    /// Database
    MONGO_URI: process.env.MONGO_URI || "YOUR_MONGO_URI",  // your mongo uri
}