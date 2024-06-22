const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `leave`
    },
    async execute(interaction, client) {
        client.app.leave(interaction);
    }
}