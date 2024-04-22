const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("memes")
        .setDescription("Obtén una imagen de la categoría especificada"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        try {
            const response = await axios.get(`https://cdn.apiwant.xyz/api/memes`);
            const imageUrl = response.data.url;

            const embed = new EmbedBuilder()
            .setImage(`${imageUrl}`)

            const boton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel("Descargar")
                .setURL(`${imageUrl}`)
                .setStyle(ButtonStyle.Link)
            )

            return interaction.reply({ embeds: [embed], components: [boton] });
        } catch (error) {
            console.error("Ocurrió un error:", error);
            return interaction.reply("Ocurrió un error al procesar tu solicitud.");
        }
    },
};
