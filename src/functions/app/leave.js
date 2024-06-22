const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.leave = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({ephemeral: true, content: `${client.emotes.error} | There is nothing in the queue right now!`})
        let song = client.distube.getQueue(interaction).songs[0];

        await interaction.reply({ content: `${client.emotes.error} | Stopped Playing.`, ephemeral: true })

        const embed = new EmbedBuilder()
            .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: 'STOPPED PLAYING'})
            .setDescription(`Last Song: [${song.name}](${song.url})`)
            .setColor(client.color)
    
            queue.textChannel.send({
                embeds: [embed]
        });

        client.clearMusicPanels(queue.textChannel);
        client.distube.voices.leave(interaction);

        return;
    }
}