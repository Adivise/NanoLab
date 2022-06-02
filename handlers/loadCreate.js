const { Client } = require("discord.js");
const Hoyoverse = require("../settings/models/Hoyoverse.js");
  
  /**
   *
   * @param {Client} client
   */
module.exports = async (client) => {

    client.CreateAndUpdate = async function (mention_id) {
        const newuser = await Hoyoverse.findOne({ user_id: mention_id });
        if (!newuser) {
            const newDatabase = await new Hoyoverse({
                user_id: mention_id,
                hyv_cookie: "",
                hyv_uid: "",
            });
            await newDatabase.save();
        }
    };

    client.FillCookies = async function (user, uid, cookies) {

        await client.CreateAndUpdate(user);

        const hoyolab = await Hoyoverse.findOne({ user_id: user });

        hoyolab.hyv_cookie = cookies;
        hoyolab.hyv_uid = uid;
        hoyolab.user_id = user;

        await hoyolab.save();
    }

    client.CheckAndUpdate = async function (interaction, user_id) {
        const database = await Hoyoverse.findOne({ user_id: user_id });
        /// Return went user not set cookie
        if (!database.hyv_cookie) {
            interaction.editReply("Use the `/genshin login` to set your hoyolab cookie and genshin impact uid!");
            return;
        }

        await client.genshin.loginWithCookie(database.hyv_cookie);
        await client.genshin.setServerType("os");
        await client.genshin.setServerLocale("en-us");
    }
};