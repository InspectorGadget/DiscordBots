const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription(`${bot.user.username} Information`)
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name: ", bot.user.username)
    .addField("Created On: ", bot.user.createdAt)
    .addField("Created By: ", config.createdBy);

    message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}