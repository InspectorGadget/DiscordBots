// InspectorGadget

const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({"disableEveryone": true});
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {

    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("No command file found!");
        return;
    }


    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

    bot.on("message", async message => {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        let prefix = config.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.splice(1);
        let commandFile = bot.commands.get(cmd.slice(prefix.length));

        if (commandFile) commandFile.run(bot, message, args);

    });

});

if (config.token == "") {
    console.log("You don't have a valid Token!");
} else {
    bot.login(config.token);
    console.log(`Logged in!`);
}