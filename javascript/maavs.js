const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');


var prefixList = [
    '!',
    '-'
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//Command: Change Prefix
client.on('message', msg => {
var command = msg.content.split(" ");
  
  if (command[0] === config.prefix + 'ping') {
    msg.reply('quack');
  }
  else if (command[0] === config.prefix + 'prefix') {
    
    config.prefix = command[1];
    msg.reply('Prefix Changed to ' + config.prefix);
    config.prefix = command[1];
    console.log("prefix changed!");
  }
});

client.login(config.token);