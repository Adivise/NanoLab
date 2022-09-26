const { Database } = require("st.db");

module.exports = async (client) => {

    client.CreateAndUpdate = async function (interaction) {
        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.has(interaction.user.id);
        if (!database) {
            await db.set(interaction.user.id, {
                hyv_cookie: "",
                hyv_uid: "",
            });
        }
    };

    client.FillCookies = async function (interaction, uid, cookies) {
        await client.CreateAndUpdate(interaction);
        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        await db.set(interaction.user.id, {
            hyv_cookie: cookies,
            hyv_uid: uid,
        });
    }

    client.CheckAndUpdate = async function (interaction) {
       // await interaction.deferReply({ ephemeral: false });
       const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
       const database = await db.get(interaction.user.id);
        /// Return went user not set cookie
        if (!database.hyv_cookie) {
            interaction.editReply("Use the `/genshin login` to set your hoyolab cookie and genshin impact uid! | <https://gist.github.com/Adivise/9d583d95d43ec56ad1ee07fd3fff07f2>");
            return;
        }

        await client.genshin.loginWithCookie(database.hyv_cookie);
        await client.genshin.setServerType("os");
        await client.genshin.setServerLocale("en-us");
    }

    console.log(`[INFO] Database are Loaded!`);
};