import * as Discord from "discord.js";
const bot = new Discord.Client();
import dotenv from "dotenv";
dotenv.config();

import ping from "./commands/ping"
import math from "./commands/math"
import help from "./commands/help"
import version from "./commands/version"

bot.on("message", msg => {
	if (msg.content.match(/^\-ping$/i))
		ping(msg);

	else if (msg.content.match(/^\-math/i)) {
		try {
			math(msg)
		} catch {
			msg.channel.send("There was an error in your mathematical expression")
		}
	}
	
	else if(msg.content.match(/^-help/i))
		help(msg)
		
		
	else if(msg.content.match(/^-version$/i))
		version(msg)
})

bot.login(process.env.BOT_TOKEN)