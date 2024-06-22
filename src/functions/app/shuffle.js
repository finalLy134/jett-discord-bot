const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.shuffle = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true})
        queue.shuffle()
        interaction.reply({content:`${client.emotes.success} | Shuffled Songs in the Queue.`, ephemeral: true})

        return;
    }
}