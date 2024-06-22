const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song.'),
    async execute(interaction, client) {
        client.app.pause(interaction);
    }
}