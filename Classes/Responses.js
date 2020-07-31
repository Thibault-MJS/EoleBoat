const { Client, Message, MessageEmbed } = require('discord.js'); // !important
const config = require('../config');

class Responses {
    /**
     * Constructeur de réponses
     * 
     * @param {Client} bot 
     * @param {Message} message 
     */
    constructor(bot, message) {
        if (!bot instanceof Client) throw new Error("bot MUST BE A CLIENT INSTANCE");
        else if (!message instanceof Message) throw new Error("message MUST BE A MESSAGE INSTANCE");
        this.bot = bot;
        this.message = message;
        this.perms = {
            ADMINISTRATOR: "Administrateur",
            CREATE_INSTANT_INVITE: "Créer des invitations",
            KICK_MEMBERS: "Exclure des membres",
            BAN_MEMBERS: "Bannir des membres",
            MANAGE_CHANNELS: "Gérer les salons",
            MANAGE_GUILD: "Gérer le serveur",
            ADD_REACTIONS: "Ajouter des réactions",
            VIEW_AUDIT_LOG: "Voir les logs",
            PRIORITY_SPEAKER: "Voix prioritaire",
            STREAM: "Streamer des jeux",
            VIEW_CHANNEL: "Voir les salons",
            SEND_MESSAGES: "Envoyer des messages",
            SEND_TTS_MESSAGES: "Envoyer des messages TTS",
            MANAGE_MESSAGES: "Gérer les messages",
            EMBED_LINKS: "Intégrer des liens",
            ATTACH_FILES: "Attacher des fichiers",
            READ_MESSAGE_HISTORY: "Voir l'historique des messages",
            MENTION_EVERYONE: "Mentionner @everyone",
            USE_EXTERNAL_EMOJIS: "Utiliser des emojis externes",
            CONNECT: "Se connecter à un salon vocal",
            SPEAK: "Parler dans un canal vocal",
            MUTE_MEMBERS: "Muter les membres",
            DEAFEN_MEMBERS: "Rendre sourd les membres",
            MOVE_MEMBERS: "Déplacer les membres",
            USE_VAD: "Utiliser la détection vocale",
            CHANGE_NICKNAME: "Changer de pseudonyme",
            MANAGE_NICKNAMES: "Gérer les pseudonymes",
            MANAGE_ROLES: "Gérer les rôles",
            MANAGE_WEBHOOKS: "Gérer les Webhooks",
            MANAGE_EMOJIS: "Gérer les emojis"
        }
    }

    /**
     * Envoyer une erreur de type permission
     * 
     * @param {String[]} permissions 
     */
    errorPermissions(permissions) {
        return new MessageEmbed()
            .setColor(config.colors.error)
            .setAuthor(this.message.author.tag, this.message.author.displayAvatarURL())
            .setDescription(`${config.emotes.error} Vous ne possédez pas les permissions requises.`)
            .addField(`❯ **Permissions requises**`, permissions.map(perm => `\`${this.perms[perm]}\``).join(', '));
    }
}

module.exports = Responses;