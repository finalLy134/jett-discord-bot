const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.rewind = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true})
        
        if (queue.currentTime < 10) queue.seek(0);
        else queue.seek((queue.currentTime - 10));

        return await interaction.reply({content: `${client.emotes.success} | Rewinded the song for 10s!`, ephemeral: true})
    }
}