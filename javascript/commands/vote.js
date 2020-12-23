const fs = require('fs');
const Discord = require('discord.js');
const masterlist = require('../masterlist.json');
const config = require('../config.json');

module.exports = {
	name: 'vote',
	aliases: ['demo', 'mn','v'],
	description: 'Voting System',
    
    execute(message, args) {

        if(masterlist.listlength > 0){
            var MovieA = "null";
            var MovieB = "null";
            var MovieC = "null";
            var MovieD = "null";
    
            function chooser()
            {  
                var dupe = true;
                var check = 0;
                var error = "No Selection!";
                var randnumb;
                var randomchoice;
                var timelapsed;
                var daySince;

    
                    while (dupe && check < 200) {
                        
                        randnumb = Math.floor((Math.random() * (masterlist.listlength - 1)) + 0);
                        randomchoice = masterlist.list[randnumb].title;
                        timelapsed  = Date.now() - masterlist.list[randnumb].timestamp;
                        daySince = (timelapsed / (1000*60*60*24));

                        if(daySince >= 1)
                        {
                            if( MovieA.toLowerCase() == randomchoice.toLowerCase() || MovieB.toLowerCase() == randomchoice.toLowerCase() || MovieC.toLowerCase() == randomchoice.toLowerCase() || MovieD.toLowerCase() == randomchoice.toLowerCase() ){
                                dupe = true;
                                check++;
                            }
                            else{
                                console.log(randomchoice);
                                return randomchoice;
                            }
                        }
                        else
                        {
                            dupe = true;
                            check++;
                        }

                        console.log("im stuck!");
                    }
    
                if(dupe &&  check >= 3){
                    console.log(error);
                    return error;
                }
            }
    
            MovieA = chooser();
            MovieB = chooser();
            MovieC = chooser();
            MovieD = chooser();

            if(MovieA == "No Selection!" && MovieB == "No Selection!" && MovieC == "No Selection!" && MovieD == "No Selection!"){
                
                message.reply("Vote Failed: No Eligable Movie Selections!");
                return;
            }
    
            var MovieAWin = MovieA;
            var MovieBWin = MovieB;
            var MovieCWin = MovieC;
            var MovieDWin = MovieD;
    
            var embed = {
                "title": "MOVIE VOTE",
                "description": "Every Vote Counts! \n 2 Minutes to Vote",
                "url": "",
                "color": 16777215,
                "footer": {
                  "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                  "text": "Vote Using Reactions"
                },
                "thumbnail": {
                  "url": "https://landoverlandings.com/wp-content/uploads/2019/10/vote_907446.png"
                },
                "image": {
                  "url": "https://static.zoonar.com/img/www_repository5/28/ce/88/10_7fb9ce17c949248e3509f3d8798807af.jpg"
                },
                "author": {
                  "name": "MAAVS",
                  "url": "",
                  "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "fields": [
                  {
                    "name": "🍎 " + MovieA,
                    "value": "For " + MovieA + " react:```Voting In Progress```",
                  },
                  {
                    "name": "🍊 " +  MovieB,
                    "value": "For " + MovieB + " react:```Voting In Progress```",
                    "inline": true
                  },
                  {
                    "name": "🍇 " + MovieC,
                    "value": "For " + MovieC + " react:```Voting In Progress```"
                  },
                  {
                    "name": "🍌 " + MovieD,
                    "value": "For " + MovieD + " react:```Voting In Progress```",
                    "inline": true
                  }
                ]
            };
    
            //message.channel.send({ embed });
            
            message.channel.send({embed}).then(embedMessage => {
                
                embedMessage.react('🍎');
                embedMessage.react('🍊');
                embedMessage.react('🍇');
                embedMessage.react('🍌');
    
                var MovieAResult = "``` ";
                var MovieBResult = "``` ";
                var MovieCResult = "``` ";
                var MovieDResult = "``` ";
    
                const filter = (reactionA, reactionB, reactionC, user) => {
                    return reactionA.emoji.name === '🍎' || '🍊' || '🍇' || '🍌';
                };
                
                const collector = embedMessage.createReactionCollector(filter, { time: 10000 });
                
                collector.on('collect', (reaction, user) => {
                    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                });
                
                collector.on('end', collected => {
                    console.log(`${collected.array()[0].count}`)
                    
    
                    
                    var Acount = collected.array()[0];
                    var Bcount = collected.array()[1];
                    var Ccount = collected.array()[2];
                    var Dcount = collected.array()[3];
    
                    //debug format for numbers greater than 15
                    
                    Acount.count = 2;
                    Bcount.count = 5;
                    Ccount.count = 15;
                    Dcount.count = 20;
                    
                    
                    //Formats Votes Readout
                    for (let index = 0; index < (Acount.count) - 1; index++) {
                        if(Acount.count >= 15){
                            MovieAResult =  "```" + Acount.count + " Votes!";
                        }
                        else{
                            MovieAResult += "🍎 ";
                        }
                        
                    };
                    for (let index = 0; index < (Bcount.count) - 1; index++) {
                        if(Bcount.count >= 15){
                            MovieBResult =  "```" + Bcount.count + " Votes!";
                        }
                        else{
                            MovieBResult += "🍊 ";
                        }
                    };
                    for (let index = 0; index < (Ccount.count) - 1; index++) {
                        if(Ccount.count >= 15){
                            MovieCResult =  "```" + Ccount.count + " Votes!";
                        }
                        else{
                            MovieCResult += "🍇 ";
                        }
                    };
                    for (let index = 0; index < (Dcount.count) - 1; index++) {
                        if(Dcount.count >= 15){
                            MovieDResult =  "```" + Dcount.count + " Votes!";
                        }
                        else{
                            MovieDResult += "🍌 ";
                        }
                    };
    
    
                    MovieAResult += "```";
                    MovieBResult += "```";
                    MovieCResult += "```";
                    MovieDResult += "```";
    
                    //Format Winner
                    if(Acount.count > 0 &&  Acount.count > Bcount.count && Acount.count > Ccount.count && Acount.count > Dcount.count){
                        MovieAWin += " \:upside_down:";
                    }
                    if(Bcount.count > 0 &&  Bcount.count > Acount.count && Bcount.count > Ccount.count && Bcount.count > Dcount.count){
                        MovieBWin += "\:upside_down:";
                    }
                    if(Ccount.count > 0 &&  Ccount.count > Bcount.count && Ccount.count > Acount.count && Ccount.count > Dcount.count){
                        MovieCWin += " \:upside_down:";
                    }
                    if(Dcount.count > 0 &&  Dcount.count > Bcount.count && Dcount.count > Ccount.count && Dcount.count > Acount.count){
                        MovieDWin += " \:upside_down:";
                    }
    
                    const newEmbed = new Discord.MessageEmbed();
    
                    newEmbed.setTitle("MOVIE VOTE");
                    newEmbed.setDescription("Every Vote Counts!");
                    newEmbed.setThumbnail("https://landoverlandings.com/wp-content/uploads/2019/10/vote_907446.png")
                    newEmbed.setAuthor("MAAVS","https://cdn.discordapp.com/embed/avatars/0.png");
                    newEmbed.setFooter("Vote Using Reactions", "https://cdn.discordapp.com/embed/avatars/0.png");
                    newEmbed.addField(`${MovieAWin}`, `${MovieAResult}`, false);
                    newEmbed.addField(`${MovieBWin}`, `${MovieBResult}`, true);
                    newEmbed.addField(`${MovieCWin}`, `${MovieCResult}`, false);
                    newEmbed.addField(`${MovieDWin}`, `${MovieDResult}`, true);
    
    
                    console.log(`Collected ${collected.values()} items`);
                    console.log(collected.array());
    
    
                    //message.channel.send(`${Acount.count}`+ `${Acount.emoji.name}` + "reacted");
                    //message.channel.send(`${Bcount.count}`+ `${Bcount.emoji.name}` + "reacted");
                    //message.channel.send(`${Ccount.count}`+ `${Ccount.emoji.name}` + "reacted");
                    //message.channel.send(`${Dcount.count}`+ `${Dcount.emoji.name}` + "reacted");
    
                    embedMessage.edit(newEmbed);
                });
    
            });
    
            console.log("Excecuted: Vote");
        }
        else{
            message.reply("Vote Failed: Movie List Empty!")
        }
    },
};



