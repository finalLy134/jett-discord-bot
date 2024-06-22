const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to the next song in the queue.'),
    async execute(interaction, client) {
        client.app.skip(interaction);
    }
}