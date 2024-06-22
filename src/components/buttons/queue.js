const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `queue`
    },
    async execute(interaction, client) {
        client.app.queue(interaction);
    }
}