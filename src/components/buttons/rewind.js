const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `rewind`
    },
    async execute(interaction, client) {
        client.app.rewind(interaction);
    }
}