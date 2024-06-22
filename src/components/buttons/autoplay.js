const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `autoplay`
    },
    async execute(interaction, client) {
        client.app.autoplay(interaction);
    }
}