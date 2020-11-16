const Discord = require('discord.js');
const token = require('./token');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('quack');
  }
});

client.login(token);