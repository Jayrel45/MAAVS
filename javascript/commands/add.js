
module.exports = {
	name: 'add',
	description: 'Add a Value to a list',
	execute(message, args) {
        var fs = require('fs'); 
        fs.open('demo.txt', 'w+', function (err, f) { 
            console.log('Saved!'); 
        }); 

        console.log("Excecuted: add");
	},
};