const chalk = require('chalk');
const Dashbaord = require('../../dashboard/dashboard.js');

module.exports = async (client) => {
  console.log("\n" + chalk.green("[READY]") + " " + client.user.tag + " is ready!");
  await Dashbaord(client);
}
