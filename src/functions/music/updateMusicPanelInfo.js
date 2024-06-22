const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Genius = require("genius-lyrics");
const GeniusClient = new Genius.Client(process.env.geniusSecret);

module.exports = (client) => {
    client.updateMusicPanelInfo = async (queue, song) => {
        if (client.musicPanel != undefined || client.musicPanel != null || client.musicPanelID != undefined || client.musicPanelID != null) {
            queue.textChannel.messages.fetch(client.musicPanelID)
            .then(async (message) => { 
                let embed = new EmbedBuilder()
                .setAuthor({ name: 'MUSIC PANEL', iconURL: client.user.displayAvatarURL() })
                .setDescription(`🎵 [${song.name}](${song.url})`)
                .setColor(client.primaryColor)
                .setThumbnail(song.thumbnail)
                .addFields(
                    { name: `👤 Requested by: `, value: `${song.user}`, inline: true },
                    { name: `🕓 Music Duration: `, value: `\`${song.formattedDuration}\``, inline: true },
                    { name: `🌀 Music Author: `, value: `[${song.uploader.name}](${song.uploader.url})`, inline: true },
                    { name: `🔊 Volume: `, value: `\`${queue.volume}%\``, inline: true },
                    { name: `🔍 Filter: `, value: `\`${queue.filters.names.join(', ') || 'Off'}\``, inline: true },
                    { name: `🔁 Loop: `, value: `\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'}\``, inline: true }
                )
                .setTimestamp(Date.now());
            
                // Lyrics:
                const songName = song.name;
                const searches = await GeniusClient.songs.search(songName);
            
                // Pick first one: (Popular)
                const firstSong = searches[0];
            
                let lyricsURL = null;
                try {
                    lyricsURL = firstSong.url;
                } catch(error) {
                    // console.log(`Couldn't find a lyrics page for ${song.name}`);
                }
            
                const controls = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('pause')
                        .setEmoji("⏯")
                        .setLabel("Pause")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('skip')
                        //.setEmoji("<:disc:1027600347792941067>")
                        .setEmoji("⏭")
                        .setLabel("Skip")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('stop')
                        //.setEmoji("<:disc:1027600347792941067>")
                        .setEmoji("⏹")
                        .setLabel("Stop")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('repeat')
                        //.setEmoji("<:disc:1027600347792941067>")
                        .setEmoji("🔁")
                        .setLabel("Loop")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('forward')
                        //.setEmoji("<:disc:1027600347792941067>")
                        .setEmoji("⏩")
                        .setLabel("10s")
                        .setStyle(ButtonStyle.Secondary)
                );
                const listControls = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('autoplay')
                        .setEmoji("🔄")
                        .setLabel("AutoPlay")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('shuffle')
                        .setEmoji("🔀")
                        .setLabel("Shuffle")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('volumedown')
                        .setEmoji("🔉")
                        .setLabel("Down")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('volumeup')
                        .setEmoji("🔊")
                        .setLabel("Up")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('rewind')
                        .setEmoji("⏪")
                        .setLabel("10s")
                        .setStyle(ButtonStyle.Secondary),
                );
                const shortcutControls = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('queue')
                        .setEmoji("💽")
                        .setLabel("Show Queue")
                        .setStyle(ButtonStyle.Success)
                );
            
                if (lyricsURL != undefined) {
                    shortcutControls.addComponents(
                        new ButtonBuilder()
                        .setURL(`${lyricsURL}`)
                        .setLabel("Lyrics")
                        .setStyle(ButtonStyle.Link),
                    );
                }

                message.edit({embeds: [embed]});
            })
            .catch(`An error occurred whilst trying to update the Music Panel.`);
        }
    }
}