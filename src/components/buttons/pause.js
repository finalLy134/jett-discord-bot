const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `pause`
    },
    async execute(interaction, client) {
        client.app.pause(interaction);
    }
}