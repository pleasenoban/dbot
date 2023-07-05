const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("leave channel"),
	async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            return interaction.reply("ur not in a vc burh");
        }
        getVoiceConnection(interaction.guildId).disconnect();
        await interaction.reply("gone");
	},
};