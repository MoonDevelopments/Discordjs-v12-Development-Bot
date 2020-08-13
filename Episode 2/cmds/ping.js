const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
const msg = await message.channel.send("Pinging")

const ping = new Discord.MessageEmbed()
.setColor('#2DFA78')
.setDescription(`Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`)

msg.edit(``, ping)
}
module.exports.help = {
  name: "ping",
  aliases: ['p'] // put [] if you dont want to add a alias but do ['aliases here', 'aliases here'] if you want a aliases which means another word for the command
}
