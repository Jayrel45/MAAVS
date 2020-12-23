const fs = require('fs');
const { join } = require('path');
const config = require('../config.json');
var masterlist = require('../masterlist.json');
const discord = require('discord.js');


module.exports = {
	name: 'list',
	description: 'diaplay a full list of movies',
	execute(message, args) {
        var fulllist = " ";
        

       function listrefresh(){
            var timelapsed;
            var daySince;

            var list = "``` \n" + masterlist.listname.toUpperCase() + "\n";
            for (let index = 0; index < masterlist.listlength; index++) {
                
                timelapsed  = Date.now() - masterlist.list[index].timestamp;
                daySince = (timelapsed / (1000*60*60*24));

                list += "\[ID " + (masterlist.list[index].id) +  "\] " + "[" + daySince.toFixed(1) + "d] " +  masterlist.list[index].title + '\n';
            }
            
            list += "```"
            
            return list;
        }

        if(masterlist.listlength < 1){
            message.channel.send("```List Empty```");
        }
        else{
            fulllist = listrefresh();
            message.channel.send(fulllist);
        }

        console.log("Excecuted: " + this.name);
	}
};