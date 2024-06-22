const { SlashCommandBuilder, EmbedBuilder, messageLink, Embed } = require('discord.js');

module.exports = (client) => {
    client.app.queue = async (interaction) => {
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({ content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true}); 

        let currentPage = 0;
        let pages = queueGenerator(client, currentPage, queue);

        if (pages[currentPage] && queue.songs.length > 1) pages[currentPage].setTitle(`QUEUE PANEL (${currentPage+1}/${pages.length})`);

        if (queue.songs.length == 1) {
            let duration = queue.songs[0].duration;
            let timePassed = queue.currentTime;
            let formattedTimeLeft = null;
            let SECONDS = (duration - timePassed);

            if (duration < 3600) {
                formattedTimeLeft = new Date(SECONDS * 1000).toISOString().substring(14, 19);
            } else {
                formattedTimeLeft = new Date(SECONDS * 1000).toISOString().substr(11, 8);
            }

            let singleEmbed = new EmbedBuilder()
                .setColor(client.color)
                .setTitle(`QUEUE PANEL (1/1)`)
                .setDescription(`Here you can find the list of all the tracks you added to the queue,\nYou can switch between the pages with the arrows below.\nAlso you can find the queue information below the tracks.\n\n**Now Playing:** [${queue.songs[0].name}](${queue.songs[0].url}) - \`${formattedTimeLeft} left.\` \n\n`)
                .setTimestamp(Date.now())
                .setFields(
                    { name: `🔊 Volume: `, value: `\`${queue.volume}%\``, inline: true },
                    { name: `🔍 Filter: `, value: `\`${queue.filters.names.join(', ') || 'Off'}\``, inline: true },
                    { name: `🔁 Loop: `, value: `\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'}\``, inline: true }
                );
            
            await interaction.reply({ 
                embeds: [ singleEmbed ], 
                fetchReply: true
            });

            return;
        } else {
            interaction.reply({ 
                embeds: [ pages[currentPage] ], 
                fetchReply: true
            });
            const queueEmbed = await interaction.fetchReply();
            await queueEmbed.react('⬅️');
            await queueEmbed.react('➡️');
    
            const reactionFilter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (user.id != client.user.id) && (interaction.user.id === user.id); // 
            const collector = queueEmbed.createReactionCollector(reactionFilter);
    
            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === '➡️') {
                    if (currentPage < pages.length - 1) {
                        currentPage += 1;
                        pages[currentPage]
                            .setTitle(`QUEUE PANEL (${currentPage+1}/${pages.length})`)
                            .setFields(
                                { name: `🔊 Volume: `, value: `\`${queue.volume}%\``, inline: true },
                                { name: `🔍 Filter: `, value: `\`${queue.filters.names.join(', ') || 'Off'}\``, inline: true },
                                { name: `🔁 Loop: `, value: `\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'}\``, inline: true }
                            );
                        queueEmbed.edit({
                            embeds: [ pages[currentPage] ], 
                            fetchReply: true 
                        });
                    }
                } else if (reaction.emoji.name === '⬅️') {
                    if (currentPage !== 0) {
                        currentPage -= 1;
                        pages[currentPage]
                            .setTitle(`QUEUE PANEL (${currentPage+1}/${pages.length})`)
                            .setFields(
                                { name: `🔊 Volume: `, value: `\`${queue.volume}%\``, inline: true },
                                { name: `🔍 Filter: `, value: `\`${queue.filters.names.join(', ') || 'Off'}\``, inline: true },
                                { name: `🔁 Loop: `, value: `\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'}\``, inline: true }
                            );
                        queueEmbed.edit({
                            embeds: [ pages[currentPage] ], 
                            fetchReply: true 
                        });                    
                    }
                }
                queueEmbed.reactions.resolve(reaction).users.remove(user);
            })

            return;
        }
    }
}

function queueGenerator(client, currentPage, queue) {
    const embeds = [];
    let songs = 11;
    for (let i = 1; i < queue.songs.length; i += 10) {
        const current = queue.songs.slice(i, songs);
        songs += 10;
        let j = i-1;
        const info = current.map(song => `${++j}. ${song.name}`).join('\n');

        let duration = queue.songs[0].duration;
        let timePassed = queue.currentTime;
        let formattedTimeLeft = null;
        let SECONDS = (duration - timePassed);
        
        if (duration < 3600) {
            formattedTimeLeft = new Date(SECONDS * 1000).toISOString().substring(14, 19);
        } else {
            formattedTimeLeft = new Date(SECONDS * 1000).toISOString().substr(11, 8);
        }

        const message = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`QUEUE PANEL`)
            .setDescription(`Here you can find the list of all the tracks you added to the queue,\nYou can switch between the pages with the arrows below.\nAlso you can find the queue information below the tracks.\n\n**Now Playing:** [${queue.songs[0].name}](${queue.songs[0].url}) - \`${formattedTimeLeft} left.\` \n \`\`\`css\n${info}\`\`\``)
            .setTimestamp(Date.now())
            .setFields(
                { name: `🔊 Volume: `, value: `\`${queue.volume}%\``, inline: true },
                { name: `🔍 Filter: `, value: `\`${queue.filters.names.join(', ') || 'Off'}\``, inline: true },
                { name: `🔁 Loop: `, value: `\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'}\``, inline: true }
            );

        embeds.push(message);
    }

    return embeds;
}