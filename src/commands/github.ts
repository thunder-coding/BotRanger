import * as Discord from "discord.js";
import fetch from "node-fetch"
let argument: string = "";
let match: RegExpMatchArray | null;
let url: string = "https://api.github.com"

export default function(message: Discord.Message) {
	if (message.content.match(/^-gh/i))
		argument = message.content.slice(4)
	else if (message.content.match(/^-github/i))
		argument = message.content.slice(8)
	argument = argument.trim()

	if (argument.length === 0) {
		message.channel.send("Expected 1 or more arguments recieved 0");
		return;
	}

	if(argument.match(/^rate-limit$/i)) {
		fetch(url+'/rate_limit')
		.then(response=>{
				if (response.status !== 200) {
					message.channel.send('Looks like there was a problem. Status Code: ' +
						response.status);
					return;
				}
				response.json().then(function(data) {
					message.channel.send(`${data.resources.core.remaining}/${data.resources.core.limit}`);
				});
			}
		)
		.catch(function(err) {
			message.channel.send('Fetch Error :-S', err);
		});
	}
	else if(argument.match(/^user/i)){
		if(!argument.match(/^user[\s]+[A-Za-z0-9\-]+$/)){
			message.channel.send("No username provided or more than 1 username provided. BotRanger can only send GitHub user data once at a time");
			return;
		}
		fetch(url+'/users/'+argument.match(/[A-Za-z1-9\-]+$/)) 
		.then(response=>{
				if (response.status !== 200) {
					message.channel.send('GitHub user not found. If you looks to search for a organization try running `-gh org <organization username`');
					return;
				}
				response.json().then(function(data) {
					let msg = new Discord.MessageEmbed()
						.setColor('#304f55')
						.setTitle(data.name)
						.setURL(data.html_url)
						.addFields(
							{ name: 'Username', value: data.login, inline: true },
							{ name: 'Followers', value: data.followers, inline: true },
							{ name: 'Following', value: data.following, inline: true },
						)
						.setThumbnail(data.avatar_url)
						.setTimestamp()
					message.channel.send(msg);
				});
			}
		)
		.catch(function(err) {
			message.channel.send('Fetch Error :-S', err);
		});
	}
	else if(argument.match(/^org/i)){
		if(!argument.match(/^org[\s]+[A-Za-z0-9\-]+$/)){
			message.channel.send("No username provided or more than 1 username provided. BotRanger can only send GitHub user data once at a time");
			return;
		}
		fetch(url+'/orgs/'+argument.match(/[A-Za-z1-9\-]+$/)) 
		.then(response=>{
				if (response.status !== 200) {
					message.channel.send('GitHub organization not found. If you looks to search for a organization try running `-gh org <organization username`');
					return;
				}
				response.json().then(function(data) {
					let msg = new Discord.MessageEmbed()
						.setColor('#304f55')
						.setTitle(data.name)
						.setURL(data.html_url)
						.addFields(
							{ name: 'Username', value: data.login, inline: true },
							{ name: 'Verified', value: data.is_verified ? 'Yes' : 'No', inline: true },
						)
						.setThumbnail(data.avatar_url)
						.setTimestamp()
					message.channel.send(msg);
				});
			}
		)
		.catch(function(err) {
			message.channel.send('Fetch Error :-S', err);
		});
	}
	else if(argument.match(/^repo/i)){
		if(!argument.match(/^repo[\s]+[A-Za-z1-9\-]+[\/][A-Za-z1-9\-]+$/))
			message.channel.send("Repository should be in the form `<username/repo>`")
		fetch(url+'/repos/'+argument.match(/[A-Za-z1-9\-]+[\/][A-Za-z1-9\-]+$/)) 
		.then(response=>{
				if (response.status !== 200) {
					message.channel.send('GitHub repo not found. For more help with the GitHub command run `-help github`');
					return;
				}
				response.json().then(function(data) {
					let msg = new Discord.MessageEmbed()
						.setColor('#304f55')
						.setTitle(data.name)
						.setURL(data.html_url)
						.addFields(
							{ name: 'License', value: data?.license?.spdx_id??"No License", inline: true },
							{ name: 'Stars', value: data.stargazers_count, inline: true },
							{ name: 'Forks', value: data.forks, inline: true },
						)
						.setThumbnail(data.owner.avatar_url)
						.setTimestamp()
					message.channel.send(msg);
				});
			}
		)
		.catch(function(err) {
			message.channel.send('Fetch Error :-S', err);
		});
	}
	else{
		message.channel.send("No overload matched this query. Try running `-help gh` to get help about the github command")
	}
}
