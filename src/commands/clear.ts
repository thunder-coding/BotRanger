import * as Discord from "discord.js";
let count: number = 0;
export default function(message: Discord.Message): void {
	if (message.content.match(/^\-clear$/i))
		count = 50;
	else if (message.content.match(/^\-clear[\s]+[0-9]+$/i)){
		count = +message.content.match(/[0-9]+$/)![0];
		if(count > 500){
			message.channel.send("BotRanger will only delete 500 messages at a time to reduce the chances of BotRanger being rate limited by Discord")
			return;
		}
	}
	else {
		message.channel.send("No overload matched your call. Try running `-help clear` to learn more about this command")
		return;
	}
	message.channel.messages.fetch({limit: count})
		.then(messages => {
			messages.forEach(message => {
				message.delete();
			})
		})
		.catch(console.error)
}