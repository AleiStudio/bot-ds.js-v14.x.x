const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.config = require("./config.json")


client.once('ready', (bot) => {
    console.log(`bot prendido ${bot.user.username}`)
});

client.on('messageCreate', async message => {
    if (message.content === 'hola') {

        message.channel.send("hola amigo, como estas")
    }
})

client.login(client.config.token);