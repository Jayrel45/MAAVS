module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        message.channel.send('Quack!');
        console.log("Excecuted: ping");
	},
};