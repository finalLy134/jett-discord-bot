const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `repeat`
    },
    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true})

        let mode = queue.repeatMode;

        if (mode < 2) {
            mode++;
        } else if (mode === 2) {
            mode = 0;
        }

        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'
        await interaction.reply({content: `${client.emotes.repeat} | Set repeat mode to \`${mode}\``, ephemeral: true})
        client.updateMusicPanelInfo(queue, queue.songs[0]);
    }
}