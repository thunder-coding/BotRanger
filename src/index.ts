import * as Discord from "discord.js";
const bot = new Discord.Client();
import dotenv from "dotenv";
dotenv.config();

import ping from "./commands/ping"
import math from "./commands/math"

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
})

bot.login(process.env.BOT_TOKEN)