const { Client, Message, MessageEmbed } = require('discord.js'); // !important

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed()
        .setColor(bot.config.colors.primary)
}

module.exports.help = {
    name: "help",
    description: "Envoie une page d'aide spécifique à votre besoin.",
    category: "Utilitaire",
    usage: "[commande]",
    aliases: ["h"]
}