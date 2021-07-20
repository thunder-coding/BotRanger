import type * as Discord from 'discord.js'

export default function (message: Discord.Message, uptime: number): void {
  let uptimeSeconds = Math.floor((uptime / 1000) % 60)
  let uptimeMinutes = Math.floor((uptime / 60000) % 60)
  let uptimeHours = Math.floor((uptime / 3600000) % 24)
  let uptimeDays = Math.floor(uptime / 86400000)

  message.channel.send(
    `${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}min ${uptimeSeconds}s`
  )
}
