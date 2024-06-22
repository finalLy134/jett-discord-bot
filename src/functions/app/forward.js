const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.forward = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true})
        
        if (queue.currentTime < queue.songs[0].duration) queue.songs[0].duration;
        else queue.seek((queue.currentTime + 10));
        
        queue.seek((queue.currentTime + 10))
        return await interaction.reply({content: `${client.emotes.success} | Forwarded the song for 10s!`, ephemeral: true})
    }
}