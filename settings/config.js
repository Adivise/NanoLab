require("dotenv").config();

module.exports = {
    /// Bot Discord
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001",
    DEV_ID: [], /// don't put only for development
    OWNER_ID: process.env.OWNER_ID || "YOUR_DISCORD_ID"
}