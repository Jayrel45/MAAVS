const Discord = require('discord.js');
const token = require('./token');
const client = new Discord.Client();

var comPrefix = '!';

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
  
  if (command[0] === comPrefix + 'ping') {
    msg.reply('quack');
  }
  else if (command[0] === comPrefix + 'prefix') {
    
    comPrefix = command[1];
    msg.reply('Prefix Changed to ' + comPrefix);
    console.log("prefix changed!");
  }
});

client.login(token);