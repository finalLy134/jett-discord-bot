const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `shuffle`
    },
    async execute(interaction, client) {
        client.app.shuffle(interaction);
    }
}