const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `stop`
    },
    async execute(interaction, client) {
        client.app.stop(interaction);
    }
}