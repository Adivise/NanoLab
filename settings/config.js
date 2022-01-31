require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    CLIENT_ID: process.env.CLIENT_ID || "YOUR_CLIENT_ID", //your client bot id
    GUILD_ID: process.env.GUILD_ID || "YOUR_GUILD_ID", //your guild id
}