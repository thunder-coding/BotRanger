import type * as Discord from 'discord.js'

export default async function (message: Discord.Message) {
	if (message.member?.hasPermission('MANAGE_MESSAGES')) {
		message.channel.messages
			.fetch()
			.then((messages) => {
				if (message.guild)
					(message.channel as
						| Discord.TextChannel
						| Discord.NewsChannel).bulkDelete(messages)
				else message.channel.send('This command can only be used in a server')
			})
			.catch(console.error)
	} else
		message.channel.send(
			"You don't have permissions to manage messages in this channel"
		)
}
