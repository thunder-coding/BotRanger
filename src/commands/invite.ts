import * as Discord from "discord.js";

export default function(message: Discord.Message): void{
		message.channel.send("https://discord.com/oauth2/authorize?client_id=769436540329394189&scope=bot&permissions=8")
}