import * as Discord from "discord.js";
const bot = new Discord.Client();
import dotenv from "dotenv";
dotenv.config();

import ping from "./commands/ping"
import math from "./commands/math"
import help from "./commands/help"
import clear from "./commands/clear"
import version from "./commands/version"
import github from "./commands/github"
import uptime from "./commands/uptime"
import invite from "./commands/invite"

bot.on("message", msg => {
	if (msg.content.match(/^\-ping$/i))
		ping(msg);

	else if (msg.content.match(/^\-math/i))
		math(msg)
	
	else if(msg.content.match(/^-help/i))
		help(msg)
		
	else if(msg.content.match(/^-version$/i))
		version(msg)
		
	else if(msg.content.match(/^-gh/i) || msg.content.match(/^-github/i))
		github(msg)	
	
	else if(msg.content.match(/^-clear/i))
		clear(msg)
		
	else if (msg.content.match(/^\-uptime$/i))
		uptime(msg, bot.uptime as number);
	
	else if (msg.content.match(/^\-invite$/i))
		invite(msg);
})

bot.login(process.env.BOT_TOKEN)