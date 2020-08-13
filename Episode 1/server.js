const Discord = require('discord.js')
const fs = require('fs')
const bot = new Discord.Client()
const botconfig = require('./botconfig.json')

bot.commands = new Discord.Collection()
bot.prefix = botconfig.prefix
fs.readdir("./cmds", (err, files) => {
  if(err) throw err
  
  let jsFiles = files.filter(f => f.split(".").pop() === "js")
  
  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`)
    bot.commands.set(props.help.name, props)
  })
  console.log(`Loaded ${jsFiles.length} commands.`)
})

bot.errMsg = message => {
  message.channel.send("Error 404: There was a syntax error in the command.")
}

bot.permMsg = message => {
  message.channel.send("I don't have permission to use this command.")
}

String.prototype.capitalize = function(allWords) {
  if (allWords)
    return this.split(/ +/g)
    .map(
    str => str.charAt(0).toUpperCase() + str.toLowerCase().substring(1).join(" ")
    )
  else return this.toLowerCase().charAt() + this.toLowerCase(0).subtring(1)
}

bot.on('ready', () => {
  console.log(`${bot.user.username} is online.`)
})

bot.on("message", async (message) => {
  if(message.author.bot) return 
  
  if(message.content.startsWith(bot.prefix)) {
    let args = message.content
      .substring(bot.prefix.length)
      .trim()
      .split(/ +/g)
    
    let messageArray = message.content.split(" ")
    let cmds = messageArray[0].toLowerCase()
    
    let cmd = bot.commands.get(args[0].toLowerCase())
    
    if(cmd) cmd.run(bot, message, args)
  }
})
bot.login(botconfig.token)
