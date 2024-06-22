const { SlashCommandBuilder, EmbedBuilder, messageLink, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('List server queue.'),
    async execute(interaction, client) {
        client.app.queue(interaction);
    }
}