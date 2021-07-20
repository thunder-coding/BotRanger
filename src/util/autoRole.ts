import type * as Discord from 'discord.js'

interface Role {
  emoji: string
  id: string
}

function getRole(_roles: string): Array<Role> {
  let roles = _roles.split(',')
  let returnable: Array<Role> = []
  roles.forEach((_role) => {
    let role = _role.split('=')
    returnable.push({
      emoji: role[0],
      id: role[1],
    })
  })
  return returnable
}

let roles: Array<Role> = getRole(process.env.ROLES as string)

export default async function autoRole(
  action: 'ADD' | 'REMOVE',
  reaction: Discord.MessageReaction,
  user: Discord.User | Discord.PartialUser,
  bot: Discord.Client
) {
  if (reaction.message.partial) {
    reaction.message.fetch()
    if (reaction.partial) {
      reaction.fetch()
    }
  }
  if (reaction.message.id === process.env.AUTOROLE_MESSAGE) {
    roles.forEach(async (role) => {
      if (role.emoji === reaction.emoji.name) {
        let server = await bot.guilds.fetch(
          process.env.AUTOROLE_SERVER as string
        )
        let member = await server.members.fetch(user.id)
        if (action === 'ADD') {
          member.roles.add(role.id, 'React Role')
        } else if (action === 'REMOVE') {
          member.roles.remove(role.id, 'React Role')
        }
      }
    })
  }
}
