import * as Discord from 'discord.js'

export default function (message: Discord.Message): void {
	if (message.content.match(/^-help[\s]*$/i)) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields(
				{
					name: '`-ping`',
					value: 'Check if the bot is alive or not',
					inline: true,
				},
				{
					name: '`-math`',
					value: 'Solve a mathematical expression',
					inline: true,
				},
				{ name: '`-help`', value: 'Display this help message', inline: true },
				{
					name: '`-github`',
					value: 'Explore GitHub from Discord with BotRanger',
					inline: true,
				},
				{
					name: '`-version`',
					value: 'Check what version of bot you are using',
					inline: true,
				},
				{
					name: '`-clear`',
					value: 'Delete messages in current channel',
					inline: true,
				},
				{
					name: '`-uptime`',
					value: 'Check when the Bot was last offline',
					inline: true,
				}
			)
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else if (message.content.match(/^-help[\s]+math/i)) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields(
				{
					name: '`-math <expression>`',
					value: 'Solve a mathematical expression',
					inline: true,
				},
				{
					name: 'Supported mathematical operations',
					value:
						'Multiplication: `x` or `*`\nDivision: `/` or `÷`\nSubtraction: `-`\nAddition: `+`\nPower: `**`',
					inline: true,
				}
			)
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else if (message.content.match(/^-help[\s]+ping/i)) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields({
				name: '`-ping`',
				value: 'Check if the bot is alive',
				inline: true,
			})
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else if (message.content.match(/^-help[\s]+version/i)) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields({
				name: '`-version`',
				value: 'Check what version of bot you are using',
				inline: true,
			})
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else if (
		message.content.match(/^-help[\s]+github/i) ||
		message.content.match(/^-help[\s]+gh/i)
	) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields(
				{
					name: '`-gh <expression>`',
					value: 'Explore GitHub from Discord',
					inline: true,
				},
				{
					name: '`-gh user <username>`',
					value: 'Get information about a GitHub user',
					inline: true,
				},
				{
					name: '`-gh repo <username>/<repository>`',
					value: 'Get information about a GitHub repository',
					inline: true,
				},
				{
					name: '`-gh rate-limit`',
					value: 'Check if the bot is being rate limited by GitHub API',
					inline: true,
				}
			)
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else if (message.content.match(/^-help[\s]+clear/i)) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields(
				{
					name: '`-clear`',
					value: 'Delete 50 messages in current channel',
					inline: true,
				},
				{
					name: '`-clear <number>`',
					value: 'Deletes <number> messages in current channel',
					inline: true,
				}
			)
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else if (message.content.match(/^-help[\s]+uptime/i)) {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields({
				name: '`-uptime`',
				value: 'Check when the bot was last offline',
				inline: true,
			})
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	} else {
		let msg = new Discord.MessageEmbed()
			.setColor('#ffffff')
			.setTitle('BotRanger Help')
			.addFields({
				name: 'Command not found',
				value: 'Try running `-help` to get a list of all available commands',
				inline: true,
			})
			.setTimestamp()
			.setFooter('Help by BotRanger')

		message.channel.send(msg)
	}
}
