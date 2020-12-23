const fs = require('fs');
const Discord = require('discord.js');
const masterlist = require('../masterlist.json');
const config = require('../config.json');

module.exports = {
	name: 'pick',
	aliases: ['choose'],
	description: 'Chooses a title from the master list',
	execute(message, args) {

        var selection = chooser();
        var selectionmulti = "";

        args = message.content.slice(config.prefix.length + this.name.length).trim().split(" ");
        
        function chooser()
        {
            var randnumb = Math.floor((Math.random() * (masterlist.listlength - 1)) + 0);
            var randommovie = masterlist.list[randnumb].title;
            
            var randomchoice = {
                "title": randommovie,
                "author": masterlist.list[randnumb].author
            };

            return randomchoice;
        }
        
        console.log(args);

        if(!args[0]){
            

            console.log("No Arguments!")

            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Random Movie Selection')
            .setFooter('Provided by MAAVS')
            .addField(selection.title,'Suggested by: ' + selection.author)

        
            message.channel.send(exampleEmbed);

        }
        else{
            for (let index = 0; index < args[0]; index++) {
                
                var sel = chooser();

                if(selectionmulti === ""){
                    selectionmulti = sel;
                }
                else{
                    var sel = chooser();
                    selectionmulti = selectionmulti.title + "\n" + sel.title;
                }
                
            }
            message.channel.send(selectionmulti);
        }
        
        /*
        const exampleEmbed = new Discord.MessageEmbed()
            exampleEmbed.setColor("#0099ff")
            exampleEmbed.setTitle('TITLE')
            exampleEmbed.setURL('https://discord.js.org/')
            exampleEmbed.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            exampleEmbed.setDescription('Some description here')
            exampleEmbed.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            exampleEmbed.addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            exampleEmbed.addField('Inline field title', 'Some value here', true)
            exampleEmbed.setImage('https://i.imgur.com/wSTFkRM.png')
            exampleEmbed.setTimestamp();
            exampleEmbed.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
            
            message.channel.send(exampleEmbed);
        */
       console.log("Excecuted: " + this.name);
	},
};