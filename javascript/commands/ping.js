module.exports = {
	name: 'ping',
	aliases: ['honk', 'quack'],
	description: 'Ping!',
	execute(message, args) {
        message.channel.send('Quack!');
        console.log("Excecuted: ping");
	},
};