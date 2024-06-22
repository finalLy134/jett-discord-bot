const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `skip`
    },
    async execute(interaction, client) {
        client.app.skip(interaction);
    }
}