const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.pause = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true})
        if (queue.paused) {
          queue.resume()
          return await interaction.reply({ content: `${client.emotes.resumed} | Resumed Song!`, ephemeral: true })
        }
        queue.pause()
        
        await interaction.reply({
            content: `${client.emotes.pause} | Paused Song!`,
            ephemeral: true
        });
        return;
    }
}