import * as Discord from "discord.js";

export default function(message: Discord.Message){
		try {
			message.channel.send(eval(message.content.replace(/\×/g,"*").replace(/x/gi,"*").replace(/\÷/g,"/").slice(5)).toString())
		} catch {
			message.channel.send("There was an error in your mathematical expression")
		}
	}
