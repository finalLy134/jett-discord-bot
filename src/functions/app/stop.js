const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.stop = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true})
        let song = client.distube.getQueue(interaction).songs[0];
        queue.stop();

        await interaction.reply({ content: `${client.emotes.error} | Stopped Playing.`, ephemeral: true })

        const embed = new EmbedBuilder()
            .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: 'STOPPED PLAYING'})
            .setDescription(`Last Song: [${song.name}](${song.url})`)
            .setColor(client.color)
    
            queue.textChannel.send({
                embeds: [embed]
        });

        client.clearMusicPanels(queue.textChannel);
        
        return;
    }
}