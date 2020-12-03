const config = require('../config.json');

module.exports = {
	name: 'add',
	description: 'Add a Value to a list',
	execute(message, args) {
        var fs = require('fs'); 
        const cnt = 0;
        
        args = message.content.slice(config.prefix.length + this.name.length).trim().split("/n");

        console.log("Excecuted: " + this.name);
        for (let index = 0; index < args.length; index++) {
            console.log(args[index]);
            
            fs.appendFile('masterlist.json', args[index] + "\n" , (err) => {
                if (err) throw err;
                console.log('The "args[index]" was appended to file!');
                message.reply("\"" + args[index] + "\"" + " Added!");
            });
        }
        
        fs.close;

	},
};
