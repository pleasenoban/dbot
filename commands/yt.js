const { SlashCommandBuilder } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("yt")
		.setDescription("youtube music shit")
        .addStringOption(option => option.setName("url")
                                    .setDescription("url to play")
                                    .setRequired(true)
                                    .setAutocomplete(false)),
	async execute(interaction) {
        const url = interaction.options.getString("url");
        if (!interaction.member.voice.channelId) {
            return interaction.reply("join a vc first bud");
        }
        const resource = createAudioResource(ytdl(url, {
            filter: "audioonly",
            quality: "lowestaudio",
        }));
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        connection.subscribe(player);
        player.play(resource);
        await interaction.reply("playing *" + (await ytdl.getInfo(url)).videoDetails.title.replaceAll("*", "\\*") + "*");
	},
};