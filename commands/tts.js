const { SlashCommandBuilder } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require("@discordjs/voice");
const { spawn } = require("child_process");
const { espeak_path, out_wav } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("tts")
		.setDescription("nick talk NOW")
        .addStringOption(option => option.setName("text")
                                    .setDescription("text to talk")
                                    .setRequired(true)
                                    .setAutocomplete(false)),
	async execute(interaction) {
        const text = interaction.options.getString("text");
        if (!interaction.member.voice.channelId) {
            return interaction.reply("join a vc first bud");
        }
        const cp = spawn(espeak_path, ["-v", "en+f2", "-g", "5", "-a", "200", "-w", out_wav, text]);
        cp.once("close", () => {
            const vc = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            const resource = createAudioResource(out_wav);
            const player = createAudioPlayer();
            vc.subscribe(player);
            player.play(resource);
            interaction.reply(text);
        });
	},
};