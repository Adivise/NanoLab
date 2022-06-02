require("dotenv").config();

module.exports = {
    /// Bot Discord
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    CLIENT_SECRET: process.env.CLIENT_SECRET || "YOUR_CLIENT_SECRENT",  // your client secret
    DEV_ID: [], /// don't put only for development

    /// Database
    MONGO_URI: process.env.MONGO_URI || "YOUR_MONGO_URI",  // your mongo uri

    /// Website
    DOMAIN: process.env.DOMAIN || "http://localhost",  // your domain
    PORT: process.env.PORT || "80",  // your port
    CUSTOM_DOMAIN: process.env.CUSTOM_DOMAIN || false,  // using custom domain
}