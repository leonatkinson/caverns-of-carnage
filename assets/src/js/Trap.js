import { Dice } from "./Dice.js";
import { Cavern } from "./Cavern.js";

export class Trap {
  /**
   * Selects and returns a random trap description.
   * @param {Cavern} cavern - Cavern generator.
   * @returns {string} Trap description.
   */
  static get(cavern) {
    // Array of possible dungeon traps and hazards
    const traps = [
      `Anything more than ${Dice.roll(1, 10) * 50} pounds tumbles into a 10 foot deep pit.`,
      `Anything more than ${Dice.roll(1, 10) * 50} pounds tumbles into a 20 foot deep pit.`,
      `Anything more than ${Dice.roll(1, 10) * 50} pounds tumbles into a 10 foot deep pit filled with spikes.`,
      `${Dice.roll(1, 10)} rounds after entering, rubble blocks all retreat.`,
      `${Dice.roll(1, 10)} rounds after entering, oil splashes from the ceiling followed by a burning cinder.`,
      `An arrow trap fires, AB +2 ignoring shield and DEX for AC and doing 1d6 DAM.`,
      `A spear trap fires, AB +2 ignoring shield and DEX for AC and doing 1d8 DAM.`,
      `Tiny nozzles spray ${Dice.p(50) ? "odorless" : "foul"} gas. Save vs poison to avoid ${Dice.chooseOne(
        [
          "blindness",
          "fear",
          "falling asleep",
          "+4 STR",
          "-4 STR",
          "sickness (-1 AB)",
          "death by poison",
          "hallucinating (-10 AB)",
        ],
      )} for ${Dice.computeRoll("3d6")} rounds.`,
      `Save versus death +DEX to avoid a falling rock dealing 1d6 damage.`,
      `A ${Dice.roll(5, 10) * 10} foot chute drops the unsuspecting into deep water.`,
      `A smooth chute falls 20 feet, then gently curves to toss victims into a room on level below.`,
      `${Dice.p(50) ? "Barbed" : "Poisoned"} darts streak across the chamber.`,
      `A spiked chain swings wide. Save vs death or take ${Dice.roll(1, 2)}d6 damage.`,
      `Hammers swing from opposite sides, +${Dice.roll(1, 5)} AB, 2d8 DAM.`,
      `Marble-sized stones scattered everywhere require a save to avoid falling to the floor every round.`,
      `A bear trap clamps down on any failing a save vs death +DEX, doing 1d6 damage. The trap is chained to the floor.`,
      `Unseen caltrops deal 1d4 damage and require 1 round to remove.`,
      `A tripwire rings bells. A wandering monster appears in 1d6 rounds.`,
      `A net drops from the ceiling. Save vs death +DEX or become entangled.`,
      `A 6′×6′×6′ cage drops. Roll as if opening a stuck door to lift it and escape.`,
      `Tentacles whip out from a puddle, dragging sting slime over any who come near. Save vs poison or take ${Dice.roll(1, 2)}d6 damage.`,
      `Odorless gas leaks from cracks, dealing 1hp every 10 minutes of exposure.`,
      `${Dice.roll(2, 6)} inches of slippery ice covers the floor. Save to avoid falling to the floor every round.`,
      `Every 10 minutes, there is a ${Dice.roll(1, 4)} in 6 chance a jet of steam or boiling water emerges from a hole in the floor. Save vs death +DEX or take 1d6 damage.`,
      `Mud covers the chamber floor, hiding a deep area of quicksand.`,
      `The floor is covered in sharp spikes. Falling causes 1d6 damage.`,
      `Lava slowly flows across the chamber.`,
      `A river blocks progress. It's ${Dice.roll(4, 20)} feet across and ${Dice.roll(4, 20)} feet deep.`,
      `A deep ravine divides the area. It's ${Dice.roll(4, 20)} feet across and at least ${Dice.roll(1, 10) * 10} feet deep${Dice.p(33) ? " A " + Dice.chooseOne(["stone", "makeshift", "decrepid", "rope"]) + " bridge crosses the gap." : ""}.`,
      `An earthquake dumps rubble, creating an airtight chamber.`,
      `Fine dust launches into the air from footsteps. Save vs Death +CON or begin coughing.`,
      `Magical writing casts sleep spell if viewed.`,
      `Area completely submerged in water.`,
      `Hallucinogenic spores float in the air. Save vs Death +CON or hallucinate for 2d6 turns. While hallucinating, roll DC 10 +WIS to take any action.`,
      `Water pours into the chamber, filling it in 1d6 rounds. After 2d6 rounds, the water recedes.`,
      `Airborne pathogens spread disease. 1 in 20 chance every round to contract rat bite disease.`,
    ];
    return Dice.chooseOne(traps);
  }
}
