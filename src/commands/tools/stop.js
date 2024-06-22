const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop a song.'),
    async execute(interaction, client) {
        client.app.stop(interaction);
    }
}