const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
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
        if (!interaction.channel.nsfw) {
            const embed = new EmbedBuilder()
                .setDescription("❌**Este comando solo se puede usar en canales NSFW.**")
                .setColor("Red")
                .setImage("https://media.discordapp.net/attachments/1016879071940067488/1054885163592585277/unknown.png");
            return await interaction.reply({ embeds: [embed] });
        }
		const wantnsfw = await want.wantapiwaifu()
        console.log(wantnsfw)

        await interaction.reply({ content: wantnsfw })
	},
};