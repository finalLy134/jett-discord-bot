const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.skip = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true})
        try {
            const song = await queue.skip()
            await interaction.reply({ content: `${client.emotes.success} | Skipped Song!`, ephemeral: true })

            const embed = new EmbedBuilder()
                .setAuthor({ iconURL: song.user.displayAvatarURL(), name: 'SKIPPED SONG'})
                .setDescription(`[${song.name}](${song.url})`)
                .setColor(client.color)
                .addFields(
                    { name: `👤 Requested by: `, value: `${song.user}`, inline: true },
                    { name: `🕓 Music Duration: `, value: `\`${song.formattedDuration}\``, inline: true },
                    { name: `🌀 Music Author: `, value: `[${song.uploader.name}](${song.uploader.url})`, inline: true },
                );
        
                queue.textChannel.send({
                    embeds: [embed]
                });

            return;
        } catch (e) {
            return await interaction.reply({content:`${client.emotes.error} | There is nothing in the queue right now!`, ephemeral: true});
        }
    }
}