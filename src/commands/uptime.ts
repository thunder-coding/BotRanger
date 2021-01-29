import * as Discord from "discord.js";

export default function(message: Discord.Message, uptime: number): void{
		let uptimeSeconds = Math.round((uptime/1000)%60);
		let uptimeMinutes = Math.round((uptime/60000)%60);
		let uptimeHours = Math.round((uptime/3600000)%24);
		let uptimeDays = Math.round(uptime/86400000);
		
		message.channel.send(`${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}min ${uptimeSeconds}s`);
}