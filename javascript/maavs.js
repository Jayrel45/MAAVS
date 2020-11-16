const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('Nzc3NzE1MDQzMzUzNjI0NTk2.X7Hdkw.skQDWi8W4FM2UO2738997DzJjdQ');