const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Repeat a track/queue.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Enter the song\'s name.')
                .setRequired(true)
                .addChoices({name: 'Off', value: 'off'}, {name: 'Repeat Track', value: 'track'}, {name: 'Repeat Queue', value: 'queue'})),
    async execute(interaction, client) {
        const string = interaction.options.getString('type');
        const queue = client.distube.getQueue(interaction)
        if (!queue) return await interaction.reply({content: `${client.emotes.error} | There is nothing playing!`, ephemeral: true})

        let mode = null
        switch (string) {
          case 'off':
            mode = 0
            break
          case 'track':
            mode = 1
            break
          case 'queue':
            mode = 2
            break
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Repeat Queue' : 'Repeat Track') : 'Off'
        interaction.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
    }
}