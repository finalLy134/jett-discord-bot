const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.autoplay = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true})
        const autoplay = queue.toggleAutoplay()
        interaction.reply({content: `${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``, ephemeral: true})

        return;
    }
}