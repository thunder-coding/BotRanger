import * as Discord from 'discord.js'
import fetch from 'node-fetch'
let argument: string = ''
let url: string = 'https://developer.mozilla.org/api/v1/search?q='

export default function (message: Discord.Message) {
  if (message.content.match(/^-mdn/i)) argument = message.content.slice(5)
  argument = argument.trim()

  if (argument.length === 0) {
    message.channel.send('Expected 1 or more arguments recieved 0')
    return
  }

  fetch(url + encodeURI(argument))
    .then((response) => {
      if (response.status !== 200) {
        message.channel.send(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }
      response.json().then(function (data) {
        let msg = new Discord.MessageEmbed()
          .setTitle(`MDN Search for **${argument}**`)
          .setFooter(`API took ${data.metadata.took_ms}ms to delhiver data`)
        // @ts-ignore
        data.documents.forEach((e) => {
          msg.addField(e.title, 'https://developer.mozilla.org' + e.mdn_url)
        })
        message.channel.send(msg)
      })
    })
    .catch(function (err) {
      message.channel.send('Fetch Error :-S', err)
    })
}
