import * as Discord from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const bot = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

import ping from './commands/ping'
import math from './commands/math'
import help from './commands/help'
import clear from './commands/clear'
import version from './commands/version'
import github from './commands/github'
import uptime from './commands/uptime'
import mdn from './commands/mdn'
import bulkClear from './commands/bulkClear'

import autoRole from './util/autoRole'

bot.on('message', (msg) => {
	if (msg.content.match(/^\-ping$/i)) ping(msg)
	else if (msg.content.match(/^\-math/i)) math(msg)
	else if (msg.content.match(/^-help/i)) help(msg)
	else if (msg.content.match(/^-version$/i)) version(msg)
	else if (msg.content.match(/^-gh/i) || msg.content.match(/^-github/i))
		github(msg)
	else if (msg.content.match(/^-clear/i)) clear(msg)
	else if (msg.content.match(/^\-uptime$/i)) uptime(msg, bot.uptime as number)
	else if (msg.content.match(/^\-mdn/i)) mdn(msg)
	else if (msg.content.match(/^\-bulkClear/i)) bulkClear(msg)
})

bot.on('messageReactionAdd', (reaction, user) =>
	autoRole('ADD', reaction, user, bot)
)
bot.on('messageReactionRemove', (reaction, user) =>
	autoRole('REMOVE', reaction, user, bot)
)

bot.login(process.env.BOT_TOKEN)
