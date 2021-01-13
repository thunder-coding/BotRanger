import * as Discord from "discord.js";

export default function(message: Discord.Message){
	if(message.content.match(/^-help[\s]*$/)){
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle("BotRanger Help")
			.addFields(
				{ name: '`-ping`', value: 'Check if the bot is alive or not', inline: true },
				{ name: '`-math`', value: 'Solve a mathematical expression', inline: true },
				{ name: '`-help`', value: 'Display this help message', inline: true }
			)
			.setTimestamp()
			.setFooter("Help by BotRanger")
			
		message.channel.send(msg)
	}
	else if(message.content.match(/^-help[\s]+math/)){
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle("BotRanger Help")
			.addFields(
				{ name: '`-math <expression>`', value: 'Solve a mathematical expression', inline: true },
				{ name: 'Supported mathematical operations', value: 'Multiplication: `x` or `*`\nDivision: `/` or `÷`\nSubtraction: `-`\nAddition: `+`\nPower: `**`', inline: true }
			)
			.setTimestamp()
			.setFooter("Help by BotRanger")
			
		message.channel.send(msg);
	}
	else if(message.content.match(/^-help[\s]+ping/)){
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle("BotRanger Help")
			.addFields(
				{ name: '`-ping`', value: 'Check if the bot is alive', inline: true }
			)
			.setTimestamp()
			.setFooter("Help by BotRanger")
			
		message.channel.send(msg);
	}
	else {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle("BotRanger Help")
			.addFields(
				{ name: 'Command not found', value: 'Try running `-help` to get a list of all available commands', inline: true }
			)
			.setTimestamp()
			.setFooter("Help by BotRanger")
			
		message.channel.send(msg);
	}
}
