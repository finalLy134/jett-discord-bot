const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `forward`
    },
    async execute(interaction, client) {
        client.app.forward(interaction);
    }
}