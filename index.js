const fs = require('node:fs');
const path = require('node:path');
const { Routes, REST, Client, Partials, ActivityType, Collection, Events } = require('discord.js');
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: 3276799,
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require("./config.json");
const { token, clientId } = require('./config.json');

client.commands = new Collection();
const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    console.log(`Loading commands from folder: ${commandsPath}`);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`bot prendido ${client.user.username}`);
    client.user.setActivity("estamos activos", { type: ActivityType.Watching });
});

client.on('messageCreate', async message => {
    if (message.content === 'hola') {
        message.channel.send("hola amigo, como estas");
    }
});

client.login(client.config.token);

console.log(

    `############################################################################
    #                           bot-ds.js-v14.x.x                               #
    #               https://github.com/AleiStudio/bot-ds.js-v14.x.x             #
    ############################################################################`

)