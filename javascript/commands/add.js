const fs = require('fs');
const { join } = require('path');
const config = require('../config.json');
const masterlist = require('../masterlist.json');


module.exports = {
	name: 'add',
	description: 'Add a Value to a list',
	execute(message, args) {
    
        args = message.content.slice(config.prefix.length + this.name.length).trim().split("/n");
        
        var idpopulate;

        var varlist;

        varlist = masterlist;

        idpopulate = varlist.listlength;
        
        datapackage = {
            "title": args[0],
            "author": message.author.tag,
            "id": idpopulate,
            "timestamp": Date.now()
        }
        
        for (let index = 0; index < args.length; index++) {
            console.log(args[index]);
 
            varlist.list.push(datapackage);
            varlist.listlength +=1;
           
            fs.writeFile('masterlist.json', JSON.stringify(varlist, null, 2),function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(varlist.list[varlist.listlength]));
                console.log('Item Added!');
            });
            
            fs.close;
            
            message.react("👍");
        } 
	},
};