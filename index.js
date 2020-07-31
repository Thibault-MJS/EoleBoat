const { Client, Collection } = require('discord.js'); // !important
const { readdirSync } = require('fs'); // !important
const { sep } = require('path'); // !important
const lowdb = require('lowdb'); // !important
const FileSync = require('lowdb/adapters/FileSync'); // !important
const bot = new Client(); // !important

// ? Constantes optionnelles

const { success, error, warning } = require('log-symbols');
const { table } = require('table');
const figlet = require('figlet');
const chalk = require('chalk');

// ? Variables & Constantes attachées au bot

["commands", "aliases"].forEach(element => bot[element] = new Collection());
bot.config = require('./config');
bot.db = lowdb(new FileSync('database.json'));

bot.db.defaults(bot.config.datas).write();

/**
 * Charge tous les événements d'un fichier.
 * 
 * @param {String} dir 
 */
var loadEvents = (dir = bot.config.dirs.events) => {
    let eventListing = [];
    readdirSync(dir).filter(files => files.endsWith('.js')).forEach(file => {
        var eventName = file.split(".")[0];
        var event = require(`${dir}/${file}`);
        if (typeof (event) !== "function") return eventListing.push([error, chalk.red(eventName), file]);
        bot.on(eventName, event.bind(null, bot));
        return eventListing.push([success, chalk.green(eventName), file]);
    });
    return console.log(table(eventListing));
}

/**
 * Charge toutes les commande de tous les sous dossier d'un dossier.
 * 
 * @param {String} dir 
 */
var loadCommands = (dir = bot.config.dirs.commands) => {
    let commandListing = [];
    readdirSync(dir).forEach(dirs => {
        var commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith('.js'));
        for (var file of commands) {
            var pull = require(`${dir}/${dirs}/${file}`);
            if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
                if (bot.commands.get(pull.help.name)) return commandListing.push([warning, chalk.yellow(pull.help.name), file]);
                bot.commands.set(pull.help.name, pull);
                commandListing.push([success, chalk.green(pull.help.name), file]);
            } else {
                commandListing.push([error, chalk.red(file.split(".")[0]), file]);
                continue;
            }
            if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                pull.help.aliases.forEach(alias => {
                    if (bot.aliases.get(alias)) return;
                    bot.aliases.set(alias, pull.help.name);
                });
            }
        }
    });
    console.log(table(commandListing));
}

// ? Affichage graphique

figlet('Événements', (err, data) => {
    if (err) return;
    console.log(data);
    loadEvents();
    figlet('Commandes', (err, data) => {
        if (err) return;
        console.log(data);
        loadCommands();
    });
});

bot.login(bot.config.token); // !important