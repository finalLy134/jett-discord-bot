const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `volumedown`
    },
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true})
        const volume = queue.volume;
        if (isNaN(volume)) return interaction.channel.send(`${client.emotes.error} | Please enter a valid number!`)
        queue.setVolume(volume - 10)
        interaction.reply({content:`${client.emotes.success} | Volume set to \`${queue.volume}\`%`, ephemeral: true})
        client.updateMusicPanelInfo(queue, queue.songs[0]);
    }
}