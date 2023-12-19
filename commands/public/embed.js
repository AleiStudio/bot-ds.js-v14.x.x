const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Embed creado'),

        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         */
	async execute(interaction) {

        const embed = new EmbedBuilder()
        .setTitle("Embed")
        .setDescription("Este es una embed")
        .setFooter({ text: "creado por alei", iconURL: "https://cdn.discordapp.com/avatars/970561321076658176/a_82bc1ad3f1d7f7e0023f5036e472265b.gif?size=1024"})
		await interaction.reply({ embeds: [embed] });

         interaction.followUp({ content: "Gracias por utiliza el embed", ephemeral: true })
	},
};