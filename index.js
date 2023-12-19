const { Client, Partials } = require('discord.js');
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: 3276799,
    partials: [User, Message, GuildMember, ThreadMember]
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