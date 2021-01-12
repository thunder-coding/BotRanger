import * as Discord from "discord.js";

xportt default function(message: Discord.Message){
		try {
			message.channel.send(eval(message.content.replace(/\×/,"*").replace(/x/i,"*").replace(/\÷/,"/").slice(5)).toString())
		} catch {
			message.channel.send("There was an error in your mathematical expression")
		}
	}