import * as Discord from "discord.js";
let version = require("../../package.json").version;

export default function(message: Discord.Message){
		message.channel.send(`BotRanger version: ${version}`)
	}
