module.exports = async(client, message) => {
  if (message.author.bot) return;
      /// Try to create new database went this member not have!
      await client.CreateAndUpdate(message.author.id)
}