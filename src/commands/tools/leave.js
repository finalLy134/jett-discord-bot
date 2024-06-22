const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave the voice channel.'),
    async execute(interaction, client) {
        client.app.leave(interaction);
    }
}