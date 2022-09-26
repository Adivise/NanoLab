const MainClient = require("./nanolab.js");
const client = new MainClient();

client.connect();

module.exports = client;