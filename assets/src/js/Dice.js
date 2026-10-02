export class Dice {
    /**
     * Selects a random element from an array of choices.
     * @param {Array} choices - Array of selectable options.
     * @returns {*} The randomly chosen element.
     */
    static chooseOne(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    /**
     * Selects an option from a weighted choice object.
     * @param {Object} choices - Dictionary mapping choices to weights.
     * @returns {string} The selected choice key.
     */
    static chooseOneWeighted(choices) {
        let total = 0;
        for (const choice in choices) {
            total += choices[choice];
        }
        let roll = Dice.roll(1, total);
        let selectedChoice = null;
        for (const choice in choices) {
            roll -= choices[choice];
            selectedChoice = choice;
            if (roll <= 0) break;
        }
        return selectedChoice;
    }

    /**
     * Rolls a sum of multiple die rolls.
     * @param {number} rolls - Number of dice to roll.
     * @param {number} sides - Number of sides per die.
     * @returns {number} The total sum of the rolls.
     */
    static rollSum(rolls, sides) {
        let t = 0;
        for (let r = 0; r < rolls; r++) {
            t += Dice.roll(1, sides);
        }
        return t;
    }

    /**
     * Rolls a value between low and high with optional curve distribution.
     * @param {number} low - Minimum value.
     * @param {number} high - Maximum value.
     * @param {number} curve - Curve factor.
     * @returns {number} The computed roll result.
     */
    static roll(low, high, curve = 1) {
        let t = 0;
        for (let r = 0; r < curve; r++) {
            t += Math.floor(Math.random() * (high - low + 1)) + low;
        }
        return Math.round(t / curve);
    }

    /**
     * Evaluates a percentage chance roll.
     * @param {number} chance - Percentage threshold (1-100).
     * @returns {boolean} True if roll succeeds.
     */
    static p(chance) {
        return Dice.roll(1, 100) <= chance;
    }

    /**
     * Computes a die roll specification string (e.g. "3d6+2").
     * @param {string|number} spec - Die roll specification.
     * @returns {number} The calculated result.
     */
    static computeRoll(spec) {
        const match = String(spec).match(/(\d+)d?(\d+)?([\+\-]\d+)?/);
        if (!match) return parseInt(spec, 10) || 1;
        const rolls = parseInt(match[1], 10);
        const sides = match[2] ? parseInt(match[2], 10) : 1;
        const bonus = match[3] ? parseInt(match[3], 10) : 0;
        let t = bonus;
        for (let r = 0; r < rolls; r++) {
            t += Dice.roll(1, sides);
        }
        return t > 0 ? t : 1;
    }
}
