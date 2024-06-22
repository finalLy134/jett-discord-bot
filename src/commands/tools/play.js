const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Enter the song\'s name.')
                .setRequired(true)),
    async execute(interaction, client) {
        const string = interaction.options.getString('query');
        if (!string) return interaction.reply({content:`${client.emotes.error} | Please enter a song url or query to search.`, ephemeral: true})

        try {
            client.distube.play(interaction.member.voice.channel, string, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
            });
        } catch (error) {
            await interaction.reply({ content: `Something went wrong, Please try again.` });
            return;
        }

        const embed = new EmbedBuilder()
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: 'ADDING TO QUEUE'})
        .setDescription(`🔎 | Searching for **\`${string}\`**...`)
        .setColor(client.color);

        await interaction.reply({
            embeds: [ embed ]
        });
    }
}