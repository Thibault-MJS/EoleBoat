const { Client } = require('discord.js'); // !important

/**
 * Événement ready
 * 
 * @param {Client} bot 
 */
module.exports = bot => {
    var status = [`${bot.guilds.cache.size} serveur(s) | ${bot.config.prefix}help.`, `${bot.users.cache.filter(user => !user.bot)} utilisateur(s) | ${bot.config.prefix}help.`];
    setInterval(() => bot.user.setActivity(status[0]).then(() => setTimeout(() => bot.user.setActivity(status[1]), 2000)), 4000);
}