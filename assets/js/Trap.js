export class Trap {
    static get(cavern) {
        const traps = [
            `Anything more than ${Math.floor(Math.random() * 10 + 1) * 50} pounds tumbles into a 10 foot deep pit.`,
            `Anything more than ${Math.floor(Math.random() * 10 + 1) * 50} pounds tumbles into a 20 foot deep pit.`,
            `Anything more than ${Math.floor(Math.random() * 10 + 1) * 50} pounds tumbles into a 10 foot deep pit filled with spikes.`,
            `${Math.floor(Math.random() * 10 + 1)} rounds after entering, rubble blocks all retreat.`,
            `${Math.floor(Math.random() * 10 + 1)} rounds after entering, oil splashes from the ceiling followed by a burning cinder.`,
            `An arrow trap fires, AB +2 ignoring shield and DEX for AC and doing 1d6 DAM.`,
            `A spear trap fires, AB +2 ignoring shield and DEX for AC and doing 1d8 DAM.`,
            `Tiny nozzles spray ${Math.random() < 0.5 ? 'odorless' : 'foul'} gas. Save vs poison to avoid ${cavern.chooseOne([
                'blindness', 'fear', 'falling asleep', '+4 STR', '-4 STR',
                'sickness (-1 AB)', 'death by poison', 'hallucinating (-10 AB)'
            ])} for ${cavern.computeRoll('3d6')} rounds.`,
            `Save versus death +DEX to avoid a falling rock dealing 1d6 damage.`,
            `A ${Math.floor(Math.random() * 6 + 5) * 10} foot chute drops the unsuspecting into deep water.`,
            `A smooth chute falls 20 feet, then gently curves to toss victims into a room on level below.`,
            `${Math.random() < 0.5 ? 'Barbed' : 'Poisoned'} darts streak across the chamber.`,
            `A spiked chain swings wide. Save vs death or take ${Math.floor(Math.random() * 2 + 1)}d6 damage.`,
            `Hammers swing from opposite sides, +${Math.floor(Math.random() * 5 + 1)} AB, 2d8 DAM.`,
            `Marble-sized stones scattered everywhere require a save to avoid falling to the floor every round.`,
            `A bear trap clamps down on any failing a save vs death +DEX, doing 1d6 damage. The trap is chained to the floor.`,
            `Unseen caltrops deal 1d4 damage and require 1 round to remove.`,
            `A tripwire rings bells. A wandering monster appears in 1d6 rounds.`,
            `A net drops from the ceiling. Save vs death +DEX or become entangled.`,
            `A 6′×6′×6′ cage drops. Roll as if opening a stuck door to lift it and escape.`,
            `Tentacles whip out from a puddle, dragging sting slime over any who come near. Save vs poison or take ${Math.floor(Math.random() * 2 + 1)}d6 damage.`,
            `Odorless gas leaks from cracks, dealing 1hp every 10 minutes of exposure.`,
            `${Math.floor(Math.random() * 5 + 2)} inches of slippery ice covers the floor. Save to avoid falling to the floor every round.`,
            `Every 10 minutes, there is a ${Math.floor(Math.random() * 4 + 1)} in 6 chance a jet of steam or boiling water emerges from a hole in the floor. Save vs death +DEX or take 1d6 damage.`,
            `Mud covers the chamber floor, hiding a deep area of quicksand.`,
            `The floor is covered in sharp spikes. Falling causes 1d6 damage.`,
            `Lava slowly flows across the chamber.`,
            `A river blocks progress. It's ${Math.floor(Math.random() * 17 + 4)} feet across and ${Math.floor(Math.random() * 17 + 4)} feet deep.`,
            `A deep ravine divides the area. It's ${Math.floor(Math.random() * 17 + 4)} feet across and at least ${Math.floor(Math.random() * 10 + 1) * 10} feet deep${Math.random() < 0.33 ? ' A ' + cavern.chooseOne(['stone', 'makeshift', 'decrepid', 'rope']) + ' bridge crosses the gap.' : ''}.`,
            `An earthquake dumps rubble, creating an airtight chamber.`,
            `Fine dust launches into the air from footsteps. Save vs Death +CON or begin coughing.`,
            `Magical writing casts sleep spell if viewed.`,
            `Area completely submerged in water.`,
            `Hallucinogenic spores float in the air. Save vs Death +CON or hallucinate for 2d6 turns. While hallucinating, roll DC 10 +WIS to take any action.`,
            `Water pours into the chamber, filling it in 1d6 rounds. After 2d6 rounds, the water recedes.`,
            `Airborne pathogens spread disease. 1 in 20 chance every round to contract rat bite disease.`
        ];
        return cavern.chooseOne(traps);
    }
}
