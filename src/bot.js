// DotENV for private vulnerable information.
require('dotenv').config();

// Libraries:
const { token } = process.env;
const { // Discord JS:
    ActionRowBuilder, 
    ButtonBuilder, ButtonStyle, EmbedBuilder, 
    Client, Collection, 
    GatewayIntentBits, discordSort, Emoji, ActionRow } = require('discord.js');
const fs = require('fs');
const config = require('./configs/config.json');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require("@distube/yt-dlp");
const Genius = require("genius-lyrics");
const GeniusClient = new Genius.Client(process.env.geniusSecret);

// Creating client with the following intents:
const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildVoiceStates",
        "MessageContent"
    ]
});

// Client:
client.app = {};
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];
client.color = [47, 49, 54];
client.primaryColor = [152, 217, 108];
client.emotes = config.emoji;
client.genius = GeniusClient;
client.spotify = new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
        clientId: "bec67d3345744632b0f8f0f799421ffa",
        clientSecret: process.env.spotifySecret
    }
})
client.soundcloud = new SoundCloudPlugin();
client.ytdpl = new YtDlpPlugin({ update: true });
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [client.spotify, client.soundcloud, client.ytdpl],
});
client.musicPanel = undefined;
client.underCooldown = new Set();

// Register Functionality:
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();

// DisTube Events:
client.distube
    .on('playSong', (queue, song) => {
        client.sendMusicPanel(queue, song);
        client.clearMusicPanels(queue.textChannel);
    })
    .on('addSong', (queue, song) => {
        const embed = new EmbedBuilder()
        .setAuthor({ iconURL: song.user.displayAvatarURL(), name: 'ADDED TO QUEUE'})
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
    })
    .on('addList', (queue, playlist) => {
        const embed = new EmbedBuilder()
        .setAuthor({ iconURL: playlist.user.displayAvatarURL(), name: 'ADDED PLAYLIST TO QUEUE'})
        .setDescription(`${client.emotes.success} | Added playlist: [${playlist.name}](${playlist.url}) - (**${playlist.songs.length}+** Songs)\n`)
        .setColor(client.color)
        .addFields(
            { name: `👤 Requested by: `, value: `${playlist.user}`, inline: true },
            { name: `🕓 Playlist Duration: `, value: `\`${playlist.formattedDuration}\``, inline: true },
        );

        queue.textChannel.send({
            embeds: [embed]
        });
    })
    .on('error', (channel, e) => {
        if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
    })
    .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
    .on('searchNoResult', (message, query) =>
        message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
    )
    .on('finish', queue => {
        queue.textChannel.send('Finished!'); 
        client.clearMusicPanels(queue.textChannel);
    });

// Login Token to communicate with Discord:
client.login(token);