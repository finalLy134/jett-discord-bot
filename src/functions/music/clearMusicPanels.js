module.exports = (client) => {
    client.clearMusicPanels = async (textChannel) => {
        if (client.musicPanel != undefined || client.musicPanel != null || client.musicPanelID != undefined || client.musicPanelID != null) {
            textChannel.messages.fetch(client.musicPanelID)
            .then((message) => { 
                message.delete();
                client.musicPanel = null;
                client.musicPanelID = null;
            })
            .catch(console.error);
        }
    }
}