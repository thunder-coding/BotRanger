import * as Discord from "discord.js";

export default function(message: Discord.Message){
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