import type * as Discord from 'discord.js'
import { evaluate } from 'mathjs'

export default function (message: Discord.Message): void {
  if (message.content.length < 6) {
    message.channel.send('Expected 1 or more arguements, recieved 0')
    return
  }
  try {
    message.channel.send(
      evaluate(
        message.content
          .replace(/\×/g, '*')
          .replace(/x/gi, '*')
          .replace(/\÷/g, '/')
          .replace(/\°/g, 'deg')
          .replace(/\π/g, 'PI')
          .slice(6)
      ).toString()
    )
  } catch {
    message.channel.send('There was an error in your mathematical expression')
  }
}
