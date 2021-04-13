import type * as Discord from 'discord.js'
let count: number = 0
export default async function (message: Discord.Message) {
	if (message.content.match(/^\-clear$/i)) count = 50
	else if (message.content.match(/^\-clear[\s]+[0-9]+$/i)) {
		count = +message.content.match(/[0-9]+$/)![0]
		if (count > 100) {
			message.channel.send(
				'BotRanger will only delete 100 messages at a time to reduce the chances of BotRanger being rate limited by Discord'
			)
			return
		}
	} else {
		message.channel.send(
			'No overload matched your call. Try running `-help clear` to learn more about this command'
		)
		return
	}
	if (message.member?.hasPermission('MANAGE_MESSAGES')) {
		message.channel.messages
			.fetch({
				limit: count,
			})
			.then(async function (messages) {
				let messagesCount = messages.size
				let messageCounter = await message.channel.send(
					`Deleting ${messagesCount} messages`
				)
				messages.forEach((message) => {
					messagesCount--
					message.delete()
					messageCounter.edit(`Deleting... ${messagesCount}/${messages.size}`)
				})
				messageCounter.edit(`Successfully deleted ${messages.size} messages`)
			})
			.catch(console.error)
	} else
		message.channel.send(
			"You don't have permissions to manage messages in this channel"
		)
}
