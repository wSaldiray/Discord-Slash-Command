const { Client, Collection, Intents } = require('discord.js');
const config = require('./config.json'); const fs = require('fs'); 
const client = new Client({ intents: 32767 }); 
client.login(config.token).then(x => console.log('READY !!'+ client.user.username) );  

client.commands = new Collection(); let slashcommands = [];

const slashCommandFile = fs.readdirSync(`./Command`).filter((files) => files.endsWith(".js"));
  for (const file of slashCommandFile) {
   const slashCommand = require(`./Command/${file}`); let prefix = "/";
      if(!slashCommand.name) return console.error(`SlashCommand (Name) Error: ${slashCommand.name.slice(prefix.length).trim().split(' ')[0]} Komut ismi girmelisin.`);
      if(!slashCommand.description) return console.error(`SlashCommand (Description) Error: ${slashCommand.description.slice(prefix.length).trim().split(' ')[0]} Komut açıklaması girmelisin.`);
      client.commands.set(slashCommand.name, slashCommand); console.log(`Client (/) Command Loaded: ${slashCommand.name}`);
      slashcommands.push(slashCommand);
}; 
 
client.on('interactionCreate', (interaction) => {
  if(!interaction.isCommand()) return;
  const SlashCommands = client.commands.get(interaction.commandName);
  if(!SlashCommands) return; try { 
    SlashCommands.apply(client, interaction);
 } catch (error) { console.error(error) }
});

client.on('ready', () => { client.application.commands?.set(slashcommands).then(() => console.log(`Client (/) Command Registered.`)).catch((e) => console.log(e)); });
