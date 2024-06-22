const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows the information on the current playing track.'),
    async execute(interaction, client) {
        client.app.nowplaying(interaction);
    }
}