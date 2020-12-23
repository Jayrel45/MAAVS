const fs = require('fs');
const { join } = require('path');
const config = require('../config.json');
var masterlist = require('../masterlist.json');
const discord = require('discord.js');


module.exports = {
	name: 'clear',
	description: 'clears master list',
	execute(message, args) {
    
        args = message.content.slice(config.prefix.length + this.name.length).trim().split("/n");
        
        masterlist = {
            "listname": "masterlist",
            "listlength": 0,
            "list": [
            ]
        };
        
        datapackage = {
            title: args[0],
            author: message.author.tag
        }

        var confirmation = false;

        if(!confirmation){
            let filter = m => !m.author.bot;
            const collector = message.channel.createMessageCollector(filter, { time: 5000 });
            
            collector.on('collect', m => {
                
                console.log(`Collected ${m.content}`);
                
                if(m.content.includes('y')){

                    message.channel.send("Yes response collected!");
                    
                    confirmation = true;
                    
                    if(confirmation){
                        

                        fs.writeFile('masterlist.json', JSON.stringify(masterlist, null, 2),function writeJSON(err) {
                            if (err) return console.log(err);
                            console.log(JSON.stringify(masterlist.list[masterlist.listlength]));
                            console.log('Item Added!');
                        });
                            
                        fs.close();
                    };
                };
            });

            message.channel.send("Bot Collecting Messages...");

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
                if(collected.size > 0){
                    message.channel.send("Collection complete!");
                    console.log(collected);
                }
            });

        }
        
	}
};