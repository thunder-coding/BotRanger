import * as Discord from "discord.js";

export default function(message: Discord.Message){
		if(message.content.length < 6){
			message.channel.send("Expected 1 or more arguements, recieved 0")
			return;
		}
		try {
			message.channel.send(eval(message.content.replace(/\×/g,"*").replace(/x/gi,"*").replace(/\÷/g,"/").slice(6)).toString())
		} catch {
			message.channel.send("There was an error in your mathematical expression")
		}
	}
