const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('musicpanel')
        .setDescription('Sends the music panel for the current playing track.'),
    async execute(interaction, client) {
        client.app.musicpanel(interaction);
    }
}