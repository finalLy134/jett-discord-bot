const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.app.nowplaying = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({ content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true}); 

        const currentSong = queue.songs[0];
        let nextUp = `🚫 \`Nothing next in queue.\``;
        if (queue.songs[1]) {
            nextUp = `[${queue.songs[1].name}](${queue.songs[1].url})`;
        }

        let embed = new EmbedBuilder();
        embed.addFields(
            {name: 'Now Playing:', value: `🎵 [${currentSong.name}](${currentSong.url}) - *(${currentSong.formattedDuration})*`, inline: false},
            {name: 'By:', value: `[${currentSong.uploader.name}](${currentSong.uploader.url})`, inline: false},
            {name: 'Likes:', value: `👍 ${currentSong.likes.toLocaleString()}`, inline: true},
            {name: 'Dislikes:', value: `👎 ${currentSong.dislikes.toLocaleString()}`, inline: true},
            {name: 'Views:', value: `👁️ ${currentSong.views.toLocaleString()}`, inline: true},
            {name: 'Requested By:', value: `${currentSong.user} (${queue.currentTime.toFixed()}s ago)`, inline: false},
            {name: 'Playback Position:', value: `▶️ ${queue.formattedCurrentTime} - [ - - - - - - - - - - - - - - - ] - ${currentSong.formattedDuration}`, inline: false},
            {name: 'Next Up:', value: `${nextUp}`, inline: false}
        )
        .setColor(client.color)
        .setThumbnail(currentSong.thumbnail)
        .setTimestamp(Date.now())
        .setFooter({text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});

        return await interaction.reply({embeds: [embed]});
    }
}