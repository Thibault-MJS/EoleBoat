const { Client, Message } = require('discord.js'); // !important
const Responses = require('../Classes/Responses');

/**
 * Événement message
 * 
 * @param {Client} bot 
 * @param {Message} message 
 */
module.exports = async (bot, message) => {
    if (!message.guild || message.author.bot) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.author);

    // * Partie traitement

    // * Partie commandes

    message.guild.prefix = bot.db.get('prefixes').find({ guild: message.guild.id }).value() ? Object.values(bot.db.get('prefixes').filter({ guild: message.guild.id }).find('prefix').value())[1] : bot.config.prefix;
    if (!message.content.startsWith(message.guild.prefix)) return;
    var args = message.content.slice(message.guild.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();
    let command;

    // ! Vérifier si c'est une commande ou non

    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) command.run(bot, message, args);
}