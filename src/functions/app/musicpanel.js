const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.musicpanel = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({ content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true}); 

        const song = queue.songs[0];

        client.clearMusicPanels(queue.textChannel);
        client.sendMusicPanel(queue, song);
        return interaction.reply({content: `${client.emotes.success} | Successfully generated a new music panel.`, ephemeral: true})
    }
}