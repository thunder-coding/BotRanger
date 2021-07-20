import * as Discord from 'discord.js'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const Mongo = new MongoClient(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_URL}/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

Mongo.connect()

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

bot.on('message', async (msg) => {
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
  else if (msg.guild!.id === process.env.AUTOROLE_SERVER) {
    if (msg.content.match(/^-rank/i)) {
      try {
        let query = msg.author.id
        let regexMatch = msg.content.match(/[0-9]+/i)
        if (regexMatch != null) query = regexMatch[0]
        let member = await Mongo.db().collection('main').findOne({ _id: query })
        let rank = await Mongo.db()
          .collection('main')
          .countDocuments({ count: { $gt: member.count } })
        msg.channel.send(
          new Discord.MessageEmbed()
            .setThumbnail(msg.author.displayAvatarURL())
            .addField('Rank', rank + 1)
            .addField('XP', member.count)
            .setTitle(msg.author.username)
            .setTimestamp()
        )
      } catch {
        msg.channel.send(
          "The person you are looking for doesn't exist or has left the server or never sent a message in this server"
        )
      }
    } else if (
      msg.content.match(/^-lb/i) ||
      msg.content.match(/^-leaderboard/i)
    ) {
      let leaderBoard = await Mongo.db()
        .collection('main')
        .find({}, { limit: 10, sort: [['count', -1]] })
        .toArray()
      let message = new Discord.MessageEmbed()
      leaderBoard.forEach((member, index) => {
        message.addField(`#${index + 1}`, `<@${member._id}>: ${member.count}`)
      })
      message.setTitle('Server leaderboard')
      message.setThumbnail(msg.guild!.iconURL() as unknown as string)
      message.setTimestamp()
      msg.channel.send(message)
    } else if (!msg.author.bot) {
      await Mongo.db()
        .collection('main')
        .updateOne(
          { _id: msg.author.id },
          {
            $inc: {
              count: 1,
            },
          },
          {
            upsert: true,
          }
        )
    }
  }
})

bot.on('messageReactionAdd', (reaction, user) =>
  autoRole('ADD', reaction, user, bot)
)
bot.on('messageReactionRemove', (reaction, user) =>
  autoRole('REMOVE', reaction, user, bot)
)

bot.login(process.env.BOT_TOKEN)
