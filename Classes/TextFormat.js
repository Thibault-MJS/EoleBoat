class TextFormat {

    /**
     * Constructeur de la classe TextFormat
     * 
     * @param {String} str 
     */
    constructor(str) {
        if (typeof (str) !== "string") throw new Error('str must be string.');
        this.str = str;
    }

    /**
     * Mettre en majuscule un texte
     */
    upper() {
        return this.str.toUpperCase();
    }

    /**
     * Mettre en minuscule un texte
     */
    lower() {
        return this.str.toLowerCase();
    }

    /**
     * Mettre en majuscule la première lettre d'un mot puis mettre la suite en minuscule.
     */
    capitilise() {
        return this.str.slice(0,1).toUpperCase() + this.str.slice(1).toLowerCase();
    }
}

module.exports = TextFormat;