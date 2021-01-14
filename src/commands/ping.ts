import * as Discord from "discord.js";

export default function(message: Discord.Message): void{
		message.channel.send("Pong")
}