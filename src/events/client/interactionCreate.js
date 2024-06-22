module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                return await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wrong, Try again...`,
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if (!button) return new Error('There is no code for this button.');

            let queue = client.distube.getQueue(interaction)
            let cooldown = button.cooldownTime || 1500;
            let underCooldown = client.underCooldown;

            try {
                const userID = interaction.user.id;
                if (underCooldown.has(userID)) {
                    if (button.cooldownMessage) {
                        return await button.cooldownMessage();
                    } else {
                        return interaction.reply({content: `${client.emotes.error} | Please wait before trying this again.`, ephemeral: true})
                    }
                } else {
                    underCooldown.add(userID);
                    setTimeout(() => {
                        underCooldown.delete(userID);
                    }, cooldown)

                    // Updates the music panel:
                    if (queue != undefined && button.data.name != 'stop') client.updateMusicPanelInfo(queue, queue.songs[0]); 
                    return await button.execute(interaction, client);
                }
            } catch (error) {
                console.error(error);
            }
        }
    } 
}