const { SlashCommandBuilder, ChatInputCommandInteraction } = require("discord.js")
const want = require("wantnsfw")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wantnsfw')
		.setDescription('nsfw contenido +18'),

        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
	async execute(interaction) {
		const wantnsfw = await want.wantapiwaifu()
        console.log(wantnsfw)

        await interaction.reply({ content: wantnsfw })
	},
};