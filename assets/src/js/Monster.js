import { Dice } from "./Dice.js";
import { Item } from "./Item.js";
import { Cavern } from "./Cavern.js";

export class Monster {
  static roster = [
    [
      "0",
      "Giant Rat",
      "1d4",
      "3d6",
      "C",
      "",
      "13",
      "Giant Rat: AC 13, HD 1d4 HP*, #At 1 bite, Dam 1d4 + 5% chance of disease, Mv 40' Swim 20', Sv F1, Ml 8 ",
    ],
    [
      "0",
      "Rat",
      "1d1",
      "5d10",
      "",
      "",
      "13",
      "Rat: AC 11, HD 1 HP, #At 1 bite per pack, Dam 1d6 + disease, Mv 20' Swim 10', Sv NM, Ml 5 ",
    ],
    [
      "0",
      "Bat",
      "1d1",
      "1d100",
      "",
      "",
      "10",
      "Bat: AC 14, HD 1 Hit Point, #At 1 bite, Dam Confusion, Mv 30' Fly 40', Sv NM, Ml 6 ",
    ],
    [
      "0",
      "Sprite",
      "1d4",
      "3d6",
      "S",
      "",
      "13",
      "Sprite: AC 15, HD 1d4 HP, #At 1 dagger or 1 spell, Dam 1d4 or by spell, Mv 20' Fly 60', Sv MU4 (+ Elf), Ml 7 ",
    ],
    [
      "0",
      "Goblin",
      "1d8-1",
      "2d4",
      "",
      "R",
      "10",
      "Goblin: AC 14 (11), HD 1-1, #At 1 weapon, Dam 1d6 or by weapon, Mv 20' Unarmored 30', Sv F1, Ml 7 when alone ",
    ],
    [
      "0",
      "Kobold",
      "1d4",
      "4d4",
      "P",
      "Q",
      "10",
      "Kobold: AC 13 (11), HD 1d4 HP, #At 1 weapon, Dam 1d4 or by weapon, Mv 20' Unarmored 30', Sv NM, Ml 6 when alone ",
    ],
    [
      "0",
      "Giant Bee",
      "1d4",
      "1d6",
      "",
      "",
      "13",
      "Giant Bee: AC 13, HD 1d4 HP*, #At 1 sting, Dam 1d4 + poison, Mv 10' Fly 50', Sv F1, Ml 9 ",
    ],
    [
      "0",
      "Giant Centipede",
      "1d4",
      "2d4",
      "",
      "",
      "13",
      "Giant Centipede: AC 11, HD 1d4 Hit Points*, #At 1 bite, Dam poison, Mv 40', Sv NM, Ml 7 ",
    ],
    [
      "0",
      "Rot Grub",
      "1d1",
      "5d4",
      "",
      "",
      "16",
      "Rot Grub: AC 10, HD 1 HP, #At 1 bite, Dam special, Mv 5', Sv F1, Ml 12 Will burrow to the heart in 1d3 turns unless cut out/burned out (2d6 damage) first round - cure disease only save after that.",
    ],
    [
      "1",
      "Giant Shrew",
      "1d8",
      "1d4",
      "",
      "",
      "37",
      "Giant Shrew: AC 16, HD 1*, #At 2 bites, Dam 1d6/1d6, Mv 60', Sv F2, Ml 10 ",
    ],
    [
      "1",
      "Pixie",
      "1d8",
      "2d4",
      "R, S",
      "",
      "61",
      "Pixie: AC 17, HD 1***, #At 1 dagger, Dam 1d4, Mv 30' Fly 60', Sv F20 (+Elf bonuses), Ml 7 ",
    ],
    [
      "1",
      "Stirge",
      "1d8",
      "1d10",
      "D",
      "",
      "37",
      "Stirge: AC 13, HD 1*, #At 1 bite, Dam 1d4 + 1d4/round blood drain, Mv 10' Fly 60', Sv F1, Ml 9 ",
    ],
    [
      "1",
      "Gnome",
      "1d8",
      "1d8",
      "D",
      "",
      "25",
      "Gnome: AC 15 (11), HD 1, #At 1, Dam 1d6 or by weapon, Mv 20' Unarmored 40', Sv F1 (+Dwarf bonuses), Ml 8 ",
    ],
    [
      "1",
      "Hobgoblin",
      "1d8",
      "1d6",
      "R",
      "Q",
      "25",
      "Hobgoblin: AC 14 (11), HD 1, #At 1 weapon, Dam 1d8 or by weapon, Mv 30' Unarmored 40', Sv F1, Ml 8 ",
    ],
    [
      "1",
      "Orc",
      "1d8",
      "2d4",
      "D",
      "",
      "25",
      "Orc: AC 14 (11), HD 1, #At 1 weapon, Dam 1d8 or by weapon, Mv 30' Unarmored 40', Sv F1, Ml 8 ",
    ],
    [
      "1",
      "Giant Fire Beetle",
      "1d8",
      "1d8",
      "",
      "",
      "25",
      "Giant Fire Beetle: AC 16, HD 1+2, #At 1 bite, Dam 2d4, Mv 40', Sv F1, Ml 7 ",
    ],
    [
      "1",
      "Pit Viper",
      "1d8",
      "1d4",
      "",
      "",
      "37",
      "Pit Viper: AC 14, HD 1*, #At 1 bite, Dam 1d4 + poison, Mv 30', Sv F1, Ml 7 ",
    ],
    [
      "1",
      "Skeleton",
      "1d8",
      "3d4",
      "",
      "",
      "25",
      "Skeleton: AC 13, HD 1, #At 1, Dam 1d6 or by weapon, Mv 40', Sv F1, Ml 12 ½ damage from edged attacks; 1 point from missiles",
    ],
    [
      "1",
      "Spitting Cobra Snake",
      "1d8",
      "1d6",
      "",
      "",
      "37",
      "Spitting Cobra Snake: AC 13, HD 1*, #At 1 bite or 1 spit, Dam 1d4 + poison or blindness, Mv 30', Sv F1, Ml 7 ",
    ],
    [
      "2",
      "Giant Frog",
      "2d8",
      "1d4",
      "",
      "",
      "75",
      "Giant Frog: AC 13, HD 2, #At 1 tongue or 1 bite, Dam grab or 1d4+1, Mv 30' Swim 30', Sv F2, Ml 6 ",
    ],
    [
      "2",
      "Giant Toad",
      "2d8",
      "1d4",
      "",
      "",
      "75",
      "Giant Toad: AC 13, HD 2, #At 1 tongue or 1 bite, Dam grab or 1d4+1, Mv 30' Swim 30', Sv F2, Ml 6 ",
    ],
    [
      "2",
      "Giant Bat",
      "2d8",
      "1d10",
      "",
      "",
      "75",
      "Giant Bat: AC 14, HD 2, #At 1 bite, Dam 1d4, Mv 10' Fly 60' (10'), Sv F2, Ml 8 ",
    ],
    [
      "2",
      "Wood Golem",
      "2d8+2",
      "1",
      "",
      "",
      "100",
      "Wood Golem*: AC 13 ‡, HD 2+2*, #At 1 fist, Dam 1d8, Mv 40', Sv F1, Ml 12 Take +1 point damage per die and -2 to saves versus fire; suffer a -1 to initiative.",
    ],
    [
      "2",
      "Shadow",
      "2d8",
      "1d10",
      "F",
      "",
      "100",
      "Shadow*: AC 13 ‡, HD 2*, #At 1 touch, Dam 1d4 + 1 point Strength loss, Mv 30', Sv F2, Ml 12 ",
    ],
    [
      "2",
      "Caveman",
      "2d8",
      "1d10",
      "C",
      "",
      "75",
      "Caveman: AC 12, HD 2, #At 1 weapon, Dam 1d8 or weapon + 1, Mv 40', Sv F2, Ml 7 ",
    ],
    [
      "2",
      "Gnoll",
      "2d8",
      "1d6",
      "Q",
      "S",
      "75",
      "Gnoll: AC 15 (13), HD 2, #At 1 weapon, Dam 2d4 or by weapon +1, Mv 30' Unarmored 40', Sv F2, Ml 8 ",
    ],
    [
      "2",
      "Harpy",
      "2d8",
      "1d6",
      "C",
      "",
      "100",
      "Harpy: AC 13, HD 2*, #At 2 claws/1 weapon + special, Dam 1d4/1d4/1d6 or by weapon + special, Mv 20' Fly 50' (10'), Sv F2, Ml 7 ",
    ],
    [
      "2",
      "Lizard Man",
      "2d8",
      "2d4",
      "D",
      "",
      "75",
      "Lizard Man: AC 15 (12), HD 2, #At 1 weapon, Dam 1d6+1 or by weapon +1, Mv 20' Unarmored 30' Swim 40' (not in armor), Sv F2, Ml 11 ",
    ],
    [
      "2",
      "Troglodyte",
      "2d8",
      "1d8",
      "A",
      "",
      "75",
      "Troglodyte: AC 15, HD 2, #At 2 claws/1 bite, Dam 1d4/1d4/1d4, Mv 40', Sv F2, Ml 9 ",
    ],
    [
      "2",
      "Giant Bombardier Beetle",
      "2d8",
      "1d8",
      "",
      "",
      "100",
      "Giant Bombardier Beetle: AC 16, HD 2*, #At 1 bite + special, Dam 1d6 + special, Mv 40', Sv F2, Ml 8 A hot & toxic blast to the rear causes 2d6 points of damage to all within a cone 10' long and 10' wide at the far end (half damage with save vs. Death Ray).",
    ],
    [
      "2",
      "Giant Cave Locust",
      "2d8",
      "2d10",
      "",
      "",
      "125",
      "Giant Cave Locust: AC 16, HD 2**, #At 1 bite or 1 bump or 1 spit, Dam 1d2 or 1d4* or special, Mv 20' Fly 60' (15'), Sv F2, Ml 5 Can spit up to 10' away against Armor Class 11 (+ Dexterity and magical bonuses, but no normal armor value). A stricken victim must save vs. Poison or be unable incapacitated 3d6 rounds due to a horrible smell.",
    ],
    [
      "2",
      "Giant Fly",
      "2d8",
      "1d6",
      "",
      "",
      "75",
      "Giant Fly: AC 14, HD 2, #At 1 bite, Dam 1d8, Mv 30' Fly 60', Sv F2, Ml 8 ",
    ],
    [
      "2",
      "Insect Swarm 2 HD",
      "2d8",
      "1",
      "",
      "",
      "100",
      "Insect Swarm 2 HD: AC 13, HD 2*, #At 1 swarm, Dam 1d3 (double against no armor), Mv 10' Fly 20', Sv N/A, Ml 11 Unaffected by magical or normal weapons; harmed/driven off mainly by fire, sleep, smoke.",
    ],
    [
      "2",
      "Green Slime",
      "2d8",
      "1",
      "",
      "",
      "125",
      "Green Slime*: AC can always be hit, HD 2**, #At 1, Dam special, Mv 1', Sv F2, Ml 12 Turns victims to slime in 6+1d4 rounds.",
    ],
    [
      "2",
      "Yellow Mold",
      "2d8",
      "1",
      "",
      "",
      "100",
      "Yellow Mold: AC Can always be hit, HD 2*, #At Spores, Dam See description, Mv 0, Sv NM, Ml N/A Each patch can emit a cloud of spores once per day. All within 10 feet of the mold will be affected by the spores and must save vs. Death Ray or take 1d8 points of damage per round for 6 rounds.",
    ],
    [
      "2",
      "Giant Rattlesnake",
      "2d8",
      "1d2",
      "",
      "",
      "100",
      "Giant Rattlesnake: AC 15, HD 2*, #At 1 bite, Dam 1d8 + poison, Mv 40', Sv F2, Ml 8 ",
    ],
    [
      "2",
      "Giant Crab Spider",
      "2d8",
      "1d4",
      "",
      "",
      "100",
      "Giant Crab Spider: AC 13, HD 2*, #At 1 bite, Dam 1d8 + poison, Mv 40', Sv F2, Ml 7 ",
    ],
    [
      "2",
      "Ghast",
      "2d8",
      "1d4",
      "B",
      "",
      "125",
      "Ghast: AC 15, HD 2**, #At 2 claws/1 bite, Dam 1d4/1d4/1d4 + paralysis + stench, Mv 30', Sv F2, Ml 9 ",
    ],
    [
      "2",
      "Ghoul",
      "2d8",
      "1d6",
      "B",
      "",
      "100",
      "Ghoul: AC 14, HD 2*, #At 2 claws/1 bite, Dam 1d4/1d4/1d4, all plus paralysis, Mv 30', Sv F2, Ml 9 ",
    ],
    [
      "2",
      "Zombie",
      "2d8",
      "2d4",
      "",
      "",
      "75",
      "Zombie: AC 12, HD 2, #At 1, Dam 1d8 or by weapon, Mv 20', Sv F2, Ml 12 ½ damage from blunt attacks; 1 point from missiles",
    ],
    [
      "3",
      "Giant Crab",
      "3d8",
      "1d2",
      "",
      "",
      "145",
      "Giant Crab: AC 18, HD 3, #At 2 pincers, Dam 2d6/2d6, Mv 20' Swim 20', Sv F3, Ml 7 ",
    ],
    [
      "3",
      "Hell Hound",
      "3d8",
      "2d4",
      "C",
      "",
      "205",
      "Hell Hound: AC 14, HD 3**, #At 1 bite or 1 breath, Dam 1d6 or 3d6, Mv 40', Sv F3, Ml 9 ",
    ],
    [
      "3",
      "Hippogriff",
      "3d8",
      "2d8",
      "",
      "",
      "145",
      "Hippogriff: AC 15, HD 3, #At 2 claws/1 bite, Dam 1d6/1d6/1d10, Mv 60' (10') Fly 120' (10'), Sv F3, Ml 8 ",
    ],
    [
      "3",
      "Crystal Living Statue",
      "3d8",
      "1d6",
      "",
      "",
      "145",
      "Crystal Living Statue: AC 16, HD 3, #At 2 fists, Dam 1d6/1d6, Mv 30', Sv F3, Ml 12 ",
    ],
    [
      "3",
      "Tentacle Worm",
      "3d8",
      "1d3",
      "B",
      "",
      "175",
      "Tentacle Worm: AC 13, HD 3*, #At 6 tentacles, Dam paralysis, Mv 40', Sv F3, Ml 9 ",
    ],
    [
      "3",
      "Bugbear",
      "3d8+1",
      "2d4",
      "Q",
      "R",
      "145",
      "Bugbear: AC 15 (13), HD 3+1, #At 1 weapon, Dam 1d8+1 or by weapon +1, Mv 30' Unarmored 40', Sv F3, Ml 9 Surprise on 1-3 on 1d6 wearing leather or less",
    ],
    [
      "3",
      "Giant Tiger Beetle",
      "3d8",
      "1d6",
      "U",
      "",
      "145",
      "Giant Tiger Beetle: AC 17, HD 3+1, #At 1 bite, Dam 2d6, Mv 60' (10'), Sv F3, Ml 9 ",
    ],
    [
      "3",
      "Insect Swarm 3 HD",
      "3d8",
      "1",
      "",
      "",
      "175",
      "Insect Swarm 3 HD: AC 13, HD 3*, #At 1 swarm, Dam 1d3 (double against no armor), Mv 10' Fly 20', Sv N/A, Ml 11 Unaffected by magical or normal weapons; harmed/driven off mainly by fire, sleep, smoke.",
    ],
    [
      "3",
      "Giant Gecko Lizard",
      "3d8",
      "1d6",
      "",
      "",
      "145",
      "Giant Gecko Lizard: AC 15, HD 3+1, #At 1 bite, Dam 1d8, Mv 40' (special), Sv F2, Ml 7 ",
    ],
    [
      "3",
      "Wererat",
      "3d8",
      "1d8",
      "C",
      "",
      "175",
      "Wererat*: AC 13 †, HD 3*, #At 1 bite or 1 weapon, Dam 1d4 or 1d6 or by weapon, Mv 40', Sv F3, Ml 8 ",
    ],
    [
      "3",
      "Gray Ooze",
      "3d8",
      "1",
      "",
      "",
      "175",
      "Gray Ooze: AC 12, HD 3*, #At 1, Dam 2d8, Mv 1', Sv F3, Ml 12 ",
    ],
    [
      "3",
      "Shrieker",
      "3d8",
      "1d8",
      "",
      "",
      "145",
      "Shrieker: AC 13, HD 3, #At Special, Dam None, Mv 5', Sv F1, Ml 12 Screams for 1d3 rounds if attacked or approached too close (10') attracting wandering monsters, nearby monsters, etc.",
    ],
    [
      "3",
      "Giant Black Widow Spider",
      "3d8",
      "1d3",
      "",
      "",
      "175",
      "Giant Black Widow Spider: AC 14, HD 3*, #At 1 bite, Dam 2d6 + poison, Mv 20' Web 40', Sv F3, Ml 8 ",
    ],
    [
      "3",
      "Wight",
      "3d8",
      "1d6",
      "B",
      "",
      "175",
      "Wight*: AC 15 †, HD 3*, #At 1 touch, Dam Energy drain (1 level), Mv 30', Sv F3, Ml 12 1/2 damage from burning oil",
    ],
    [
      "4",
      "Carnivorous Ape",
      "4d8",
      "1d6",
      "",
      "",
      "240",
      "Carnivorous Ape: AC 14, HD 4, #At 2 claws, Dam 1d4/1d4, Mv 40', Sv F4, Ml 7 ",
    ],
    [
      "4",
      "Blink Dog",
      "4d8",
      "1d6",
      "C",
      "",
      "280",
      "Blink Dog: AC 15, HD 4*, #At 1 bite, Dam 1d6, Mv 40', Sv F4, Ml 6 ",
    ],
    [
      "4",
      "Hell Hound",
      "4d8",
      "2d4",
      "C",
      "",
      "320",
      "Hell Hound: AC 15, HD 4**, #At 1 bite or 1 breath, Dam 1d6 or 4d6, Mv 40', Sv F4, Ml 9 ",
    ],
    [
      "4",
      "Iron Living Statue",
      "4d8",
      "1d4",
      "",
      "",
      "280",
      "Iron Living Statue: AC 18, HD 4*, #At 2 fists, Dam 1d8/1d8 + special, Mv 10', Sv F4, Ml 12 Non-magic metals can stick in until killed (save versus Spells to avoid).",
    ],
    [
      "4",
      "Doppleganger",
      "4d8",
      "1d6",
      "E",
      "",
      "280",
      "Doppleganger: AC 15, HD 4*, #At 1 fist, Dam 1d12 or by weapon, Mv 30', Sv F4, Ml 10 ",
    ],
    [
      "4",
      "Gargoyle",
      "4d8",
      "1d6",
      "C",
      "",
      "320",
      "Gargoyle*: AC 15 ‡, HD 4**, #At 2 claws/1 bite/1 horn, Dam 1d4/1d4/1d6/1d4, Mv 30' Fly 50' (15'), Sv F6, Ml 11 ",
    ],
    [
      "4",
      "Medusa",
      "4d8",
      "1d3",
      "F",
      "",
      "320",
      "Medusa: AC 12, HD 4**, #At 1 snakebite + gaze, Dam 1d6+poison + petrification, Mv 30', Sv F4, Ml 8 ",
    ],
    [
      "4",
      "Ogre",
      "4d8",
      "1d6",
      "C, S",
      "",
      "240",
      "Ogre: AC 15 (12), HD 4+1, #At 1 weapon, Dam 2d6 with ogre weapon (+3 with normal weapon), Mv 30' Unarmored 40', Sv F4, Ml 10 ",
    ],
    [
      "4",
      "Giant Ant",
      "4d8",
      "2d6",
      "U",
      "",
      "240",
      "Giant Ant: AC 17, HD 4, #At 1 bite, Dam 2d6, Mv 60' (10'), Sv F4, Ml 7 on first sighting, 12 after engaged ",
    ],
    [
      "4",
      "Insect Swarm 4 HD",
      "4d8",
      "1",
      "",
      "",
      "280",
      "Insect Swarm 4 HD: AC 13, HD 4*, #At 1 swarm, Dam 1d3 (double against no armor), Mv 10' Fly 20', Sv N/A, Ml 11 Unaffected by magical or normal weapons; harmed/driven off mainly by fire, sleep, smoke.",
    ],
    [
      "4",
      "Giant Scorpion",
      "4d8",
      "1d6",
      "",
      "",
      "280",
      "Giant Scorpion: AC 15, HD 4*, #At 2 claws/1 stinger, Dam 1d10/1d10/1d6 + poison, Mv 50' (10'), Sv F2, Ml 11 ",
    ],
    [
      "4",
      "Giant Draco Lizard",
      "4d8",
      "1d4",
      "",
      "",
      "240",
      "Giant Draco Lizard: AC 15, HD 4+2, #At 1 bite, Dam 1d10, Mv 40' Fly 70' (C, and see below), Sv F3, Ml 7 ",
    ],
    [
      "4",
      "Wereboar",
      "4d8",
      "1d4",
      "C",
      "",
      "280",
      "Wereboar*: AC 16 †, HD 4*, #At 1 bite, Dam 2d6, Mv 50' Human Form 40', Sv F4, Ml 9 ",
    ],
    [
      "4",
      "Werewolf",
      "4d8",
      "1d6",
      "C",
      "",
      "280",
      "Werewolf*: AC 15 †, HD 4*, #At 1 bite, Dam 2d4, Mv 60' Human Form 40', Sv F4, Ml 8 ",
    ],
    [
      "4",
      "Gelatinous Cube",
      "4d8",
      "1",
      "V",
      "",
      "280",
      "Gelatinous Cube: AC 12, HD 4*, #At 1, Dam 2d4 + paralysis, Mv 20', Sv F2, Ml 12 ",
    ],
    [
      "4",
      "Giant Rhagodessa",
      "4d8",
      "1d4",
      "U",
      "",
      "240",
      "Giant Rhagodessa: AC 16, HD 4, #At 2 legs/1 bite, Dam grab/grab/2d8, Mv 50', Sv F4, Ml 9 ",
    ],
    [
      "4",
      "Giant Tarantula Spider",
      "4d8",
      "1d3",
      "",
      "",
      "280",
      "Giant Tarantula Spider: AC 15, HD 4*, #At 1 bite, Dam 1d8 + poison, Mv 50', Sv F4, Ml 8 ",
    ],
    [
      "4",
      "Wraith",
      "4d8",
      "1d4",
      "E",
      "",
      "320",
      "Wraith*: AC 15 ‡, HD 4**, #At 1 touch, Dam 1d6 + energy drain (1 level), Mv Fly 80', Sv F4, Ml 12 ",
    ],
    [
      "5",
      "Giant Ferret",
      "5d8",
      "1d4",
      "V",
      "",
      "360",
      "Giant Ferret: AC 17, HD 5, #At 1 bite + hold, Dam 2d4 + 2d4 per round, Mv 50', Sv F5, Ml 8 ",
    ],
    [
      "5",
      "Giant Weasel",
      "5d8",
      "1d4",
      "V",
      "",
      "360",
      "Giant Weasel: AC 17, HD 5, #At 1 bite + hold, Dam 2d4 + 2d4 per round, Mv 50', Sv F5, Ml 8 ",
    ],
    [
      "5",
      "Owlbear",
      "5d8",
      "1d4",
      "C",
      "",
      "360",
      "Owlbear: AC 15, HD 5, #At 2 claws/1 bite + 1 hug, Dam 1d8/1d8/1d8 + 2d8, Mv 40', Sv F5, Ml 9 ",
    ],
    [
      "5",
      "Hell Hound",
      "5d8",
      "2d4",
      "C",
      "",
      "450",
      "Hell Hound: AC 16, HD 5**, #At 1 bite or 1 breath, Dam 1d6 or 5d6, Mv 40', Sv F5, Ml 9 ",
    ],
    [
      "5",
      "Stone Living Statue",
      "5d8",
      "1d3",
      "",
      "",
      "405",
      "Stone Living Statue: AC 16, HD 5*, #At 2 lava sprays, Dam 2d6/2d6, Mv 20', Sv F5, Ml 12 Attacks by spraying molten rock to 5' range.",
    ],
    [
      "5",
      "Hydra",
      "5d8",
      "1",
      "B",
      "",
      "360",
      "Hydra: AC 16, HD 5, #At 5 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F5, Ml 9 ",
    ],
    [
      "5",
      "Cockatrice",
      "5d8",
      "1d4",
      "D",
      "",
      "450",
      "Cockatrice: AC 14, HD 5**, #At 1 beak + special, Dam 1d6 + petrification, Mv 30' Fly 60' (10'), Sv F5, Ml 7 ",
    ],
    [
      "5",
      "Rust Monster",
      "5d8",
      "1d4",
      "",
      "",
      "405",
      "Rust Monster*: AC 18, HD 5*, #At 1, Dam special, Mv 40', Sv F5, Ml 7 rusts metal",
    ],
    [
      "5",
      "Giant Horned Chameleon Lizard",
      "5d8",
      "1d3",
      "",
      "",
      "360",
      "Giant Horned Chameleon Lizard: AC 18, HD 5, #At 1 tongue or 1 bite, Dam grab or 2d6, Mv 40' (10'), Sv F4, Ml 7 ",
    ],
    [
      "5",
      "Weretiger",
      "5d8",
      "1d4",
      "C",
      "",
      "405",
      "Weretiger*: AC 17 †, HD 5*, #At 2 claws/1 bite, Dam 1d6/1d6/2d6, Mv 50' Human Form 40', Sv F5, Ml 9 ",
    ],
    [
      "5",
      "Ochre Jelly",
      "5d8",
      "1",
      "",
      "",
      "405",
      "Ochre Jelly*: AC 12, HD 5*, #At 1, Dam 2d6, Mv 10', Sv F5, Ml 12 Only hit by fire or cold.",
    ],
    [
      "5",
      "Python Snake",
      "5d8",
      "1d3",
      "",
      "",
      "405",
      "Python Snake: AC 14, HD 5*, #At 1 bite/1 constrict, Dam 1d4/2d4, Mv 30', Sv F5, Ml 8 ",
    ],
    [
      "5",
      "Mummy",
      "5d8",
      "1d4",
      "D",
      "",
      "450",
      "Mummy*: AC 17 ‡, HD 5**, #At 1 touch + disease, Dam 1d12 + disease, Mv 20', Sv F5, Ml 12 ½ damage from magic weapons; 2x damage from fires. Inflicts mummy rot disease on those it injures.",
    ],
    [
      "6",
      "Hell Hound",
      "6d8",
      "2d4",
      "C",
      "",
      "610",
      "Hell Hound: AC 17, HD 6**, #At 1 bite or 1 breath, Dam 1d6 or 6d6, Mv 40', Sv F6, Ml 9 ",
    ],
    [
      "6",
      "Displacer",
      "6d8",
      "1d4",
      "D",
      "",
      "555",
      "Displacer: AC 16, HD 6*, #At 2 blades, Dam 1d8/1d8, Mv 50', Sv F6, Ml 8 ",
    ],
    [
      "6",
      "Manticore",
      "6d8+1",
      "1d2",
      "D",
      "",
      "555",
      "Manticore: AC 18, HD 6+1*, #At 2 claws/1 bite or 6 spikes (180' range), Dam 1d4/1d4/2d4 or 1d6 per spike, Mv 40' Fly 60' (10'), Sv F6, Ml 9 ",
    ],
    [
      "6",
      "White Dragon",
      "6d8",
      "1d4",
      "H",
      "",
      "610",
      "White Dragon: AC 17, HD 6**, #At 2 claws/1 bite or breath/1 tail, Dam 1d4/1d4/2d8 or breath/1d4, Mv 30' Fly 80' (10'), Sv F6 (as Hit Dice), Ml 8 Immune to normal cold. Take half damage from magical cold or ice.",
    ],
    [
      "6",
      "Hydra",
      "6d8",
      "1",
      "B",
      "",
      "500",
      "Hydra: AC 17, HD 6, #At 6 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F6, Ml 9 ",
    ],
    [
      "6",
      "Minotaur",
      "6d8",
      "1d6",
      "C",
      "",
      "500",
      "Minotaur: AC 14 (12), HD 6, #At 1 gore/1 bite or 1 weapon, Dam 1d6/1d6 or by weapon + 2, Mv 30' Unarmored 40', Sv F6, Ml 11 They never become lost, and can track enemies with 85% accuracy.",
    ],
    [
      "6",
      "Troll",
      "6d8",
      "1d8",
      "D",
      "",
      "555",
      "Troll: AC 16, HD 6*, #At 3, Dam 1d6/1d6/1d10, Mv 40', Sv F6, Ml 10 (8) ",
    ],
    [
      "6",
      "Basilisk",
      "6d8",
      "1d6",
      "F",
      "",
      "610",
      "Basilisk: AC 16, HD 6**, #At 1 bite/1 gaze, Dam 1d10/petrification, Mv 20' (10'), Sv F6, Ml 9 ",
    ],
    [
      "6",
      "Giant Tuatara Lizard",
      "6d8",
      "1d2",
      "",
      "",
      "500",
      "Giant Tuatara Lizard: AC 16, HD 6, #At 2 claws/1 bite, Dam 1d4/1d4/2d6, Mv 40' (10'), Sv F5, Ml 6 ",
    ],
    [
      "6",
      "Werebear",
      "6d8",
      "1d4",
      "C",
      "",
      "555",
      "Werebear*: AC 18 †, HD 6*, #At 2 claws/1 bite + hug, Dam 2d4/2d4/2d8 + 2d8, Mv 40', Sv F6, Ml 10 ",
    ],
    [
      "6",
      "Giant Caecilia",
      "6d8",
      "1d3",
      "B",
      "",
      "555",
      "Giant Caecilia: AC 14, HD 6*, #At 1 bite + swallow on 19/20, Dam 1d8 + 1d8/round if swallowed, Mv 20' (10'), Sv F3, Ml 9 ",
    ],
    [
      "6",
      "Giant Leech",
      "6d8",
      "1d4",
      "",
      "",
      "500",
      "Giant Leech: AC 17, HD 6, #At 1 + hold, Dam 1d6 + 1d6/round, Mv 30', Sv F6, Ml 10 ",
    ],
    [
      "6",
      "Spectre",
      "6d8",
      "1d4 Lair 1d8",
      "E",
      "",
      "610",
      "Spectre*: AC 17 ‡, HD 6**, #At 1 touch, Dam Energy drain 2 levels/touch, Mv Fly 100', Sv F6, Ml 11 ",
    ],
    [
      "7",
      "Cave Bear",
      "7d8",
      "1d2",
      "",
      "",
      "670",
      "Cave Bear: AC 15, HD 7, #At 2 claws/1 bite + hug, Dam 1d8/1d8/2d6 + 2d8 hug, Mv 40', Sv F7, Ml 9 ",
    ],
    [
      "7",
      "Hell Hound",
      "7d8",
      "2d4",
      "C",
      "",
      "800",
      "Hell Hound: AC 18, HD 7**, #At 1 bite or 1 breath, Dam 1d6 or 7d6, Mv 40', Sv F7, Ml 9 ",
    ],
    [
      "7",
      "Griffon",
      "7d8",
      "2d8",
      "E",
      "",
      "670",
      "Griffon: AC 18, HD 7, #At 2 claws/1 bite, Dam 1d4/1d4/2d8, Mv 40' (10') Fly 120' (10'), Sv F7, Ml 8 ",
    ],
    [
      "7",
      "Black Dragon",
      "7d8",
      "1d4",
      "H",
      "",
      "800",
      "Black Dragon: AC 18, HD 7**, #At 2 claws/1 bite or breath/1 tail, Dam 1d6/1d6/2d10 or breath/1d6, Mv 30' Fly 80' (15'), Sv F7 (as Hit Dice), Ml 8 Immune to all forms of acid. may hold its breath up to three turns while lying in wait underwater.",
    ],
    [
      "7",
      "Hydra",
      "7d8",
      "1",
      "B",
      "",
      "670",
      "Hydra: AC 18, HD 7, #At 7 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F7, Ml 9 ",
    ],
    [
      "7",
      "Wyvern",
      "7d8",
      "1d6",
      "E",
      "",
      "735",
      "Wyvern: AC 18, HD 7*, #At 1 bite/1 stinger or 2 talons/1 stinger, Dam 2d8/1d6 + poison or 1d10/1d10/1d6 + poison, Mv 30' (10') Fly 80' (15'), Sv F7, Ml 9 ",
    ],
    [
      "7",
      "Djinni",
      "7d8+1",
      "1",
      "",
      "",
      "800",
      "Djinni*: AC 15 ‡, HD 7+1*, #At 1 fist or 1 whirlwind, Dam 2d8 or 2d6, Mv 30' Fly 80', Sv F12, Ml 12 (8) ",
    ],
    [
      "7",
      "Vampire",
      "7d8",
      "1d6",
      "F",
      "",
      "800",
      "Vampire*: AC 18 ‡, HD 7**, #At 1 weapon or special, Dam 1d8 or by weapon or special, Mv 40' Fly 60', Sv F7, Ml 11 ",
    ],
    [
      "8",
      "Bone Golem",
      "8d8",
      "1",
      "",
      "",
      "945",
      "Bone Golem*: AC 19 ‡, HD 8*, #At 4 weapons, Dam 1d6/1d6/1d6/1d6 or by weapon, Mv 40' (10'), Sv F4, Ml 12 1% chance of going beserk each round cumulative - maker can try to regain control if within 60' (save versus spells each round spent doing so).",
    ],
    [
      "8",
      "Green Dragon",
      "8d8",
      "1d4",
      "H",
      "",
      "1015",
      "Green Dragon: AC 19, HD 8**, #At 2 claws/1 bite or breath/1 tail, Dam 1d6/1d6/3d8 or breath/1d6, Mv 30' Fly 80' (15'), Sv F8 (as Hit Dice), Ml 8 Immune to all poisons.",
    ],
    [
      "8",
      "Sea Dragon",
      "8d8",
      "1d4",
      "H",
      "",
      "1015",
      "Sea Dragon: AC 19, HD 8**, #At 1 bite or breath, Dam 3d8 or breath/1d6, Mv Fly 60' (20') Swim 60' (15'), Sv F8 (as Hit Dice), Ml 8 May hold its breath up to three turns while swimming or performing other moderate activity.",
    ],
    [
      "8",
      "Hydra",
      "8d8",
      "1",
      "B",
      "",
      "875",
      "Hydra: AC 19, HD 8, #At 8 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F8, Ml 9 ",
    ],
    [
      "8",
      "Air Elemental",
      "8d8",
      "1",
      "",
      "",
      "945",
      "Air Elemental*: AC 18 ‡, HD 8*, #At 1 special, Dam 1d12, Mv Fly 120', Sv F8, Ml 10 Double damage from earth based attacks. +1d8 points of damage against airborne creatures or vehicles. May make 1 attack or a gust against all opponents in a 5' radius: creatures of 2 hit dice or less must save vs. Death Ray or fall prone. Creatures of 3 or more levels or hit dice are not affected.",
    ],
    [
      "8",
      "Earth Elemental",
      "8d8",
      "1",
      "",
      "",
      "945",
      "Earth Elemental*: AC 18 ‡, HD 8*, #At 1, Dam 1d12, Mv 20' (10'), Sv F8, Ml 10 Suffer double damage from fire attacks; do an +1d8 damage against creatures, vehicles, or structures which rest on the ground.",
    ],
    [
      "8",
      "Fire Elemental",
      "8d8",
      "1",
      "",
      "",
      "945",
      "Fire Elemental*: AC 18 ‡, HD 8*, #At 1, Dam 1d12, Mv 40' Fly 30', Sv F8, Ml 10 Take double damage from water attacks; +1d8 points of damage against creatures which are cold or icy in nature and set fire to flammables they contact.",
    ],
    [
      "8",
      "Water Elemental",
      "8d8",
      "1",
      "",
      "",
      "945",
      "Water Elemental*: AC 18 ‡, HD 8*, #At 1, Dam 1d12, Mv 20' (15') Swim 60', Sv F8, Ml 10 Take double damage when attacked from air/wind attacks. A water; +1d8 points of damage against creatures, vehicles, or structures which are in the water.",
    ],
    [
      "8",
      "Flame Salamander",
      "8d8",
      "1d4+1",
      "F",
      "",
      "945",
      "Flame Salamander*: AC 19 ‡, HD 8*, #At 2 claws/1 bite+heat, Dam 1d4/1d4/1d8+1d8/round, Mv 40', Sv F8, Ml 8 ",
    ],
    [
      "8",
      "Gorgon",
      "8d8",
      "1d4",
      "",
      "",
      "945",
      "Gorgon: AC 19, HD 8*, #At 1 gore or 1 breath, Dam 2d6 or petrification, Mv 40' (10'), Sv F8, Ml 8 ",
    ],
    [
      "8",
      "Invisible Stalker",
      "8d8",
      "1",
      "",
      "",
      "945",
      "Invisible Stalker: AC 19, HD 8*, #At 1, Dam 4d4, Mv 40', Sv F8, Ml 12 ",
    ],
    [
      "8",
      "Vampire",
      "8d8",
      "1d6",
      "F",
      "",
      "1015",
      "Vampire*: AC 19 ‡, HD 8**, #At 1 weapon or special, Dam 1d8 or by weapon or special, Mv 40' Fly 60', Sv F8, Ml 11 ",
    ],
    [
      "9",
      "Chimera",
      "9d8+8",
      "1d2",
      "F",
      "",
      "1225",
      "Chimera: AC 16, HD 9** (+8), #At 2 claws/3 heads + special, Dam 1d4/1d4/2d4/2d4/3d4 + special, Mv 40' (10') Fly 60' (15'), Sv F9, Ml 9 The dragon head is either black, blue, green, red, or white (and the breath weapon with the same) effecting a cone a 50' long cone with a 10' wide end for 3d6 points of damage (save vs. Dragon Breath for half damage).",
    ],
    [
      "9",
      "Flesh Golem",
      "9d8+8",
      "1",
      "",
      "",
      "1225",
      "Flesh Golem*: AC 20 ‡, HD 9** (+8), #At 2 fists, Dam 2d8/2d8, Mv 30', Sv F5, Ml 12 1% chance per round cumulative of going berserk. Damage it inflicts can only be healed magically (1 point per die of healing.)",
    ],
    [
      "9",
      "Blue Dragon",
      "9d8+8",
      "1d4",
      "H",
      "",
      "1225",
      "Blue Dragon: AC 20, HD 9** (+8), #At 2 claws/1 bite or breath/1 tail, Dam 1d8/1d8/3d8 or breath/1d8, Mv 30' Fly 80' (15'), Sv F9 (as Hit Dice), Ml 9 Immune to normal lightning. Suffer only half damage from magical lightning.",
    ],
    [
      "9",
      "Hydra",
      "9d8+8",
      "1",
      "B",
      "",
      "1075",
      "Hydra: AC 20, HD 9 (+8), #At 9 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F9, Ml 9 ",
    ],
    [
      "9",
      "Vampire",
      "9d8",
      "1d6",
      "F",
      "",
      "1225",
      "Vampire*: AC 20 ‡, HD 9** (+8), #At 1 weapon or special, Dam 1d8 or by weapon or special, Mv 40' Fly 60', Sv F9, Ml 11 ",
    ],
    [
      "10",
      "Amber Golem",
      "10d8+9",
      "1",
      "",
      "",
      "1390",
      "Amber Golem*: AC 21 ‡, HD 10* (+9), #At 2 claws/1 bite, Dam 2d6/2d6/2d10, Mv 60', Sv F5, Ml 12 Detect invisible creatures or objects within 60', and can track with 95% accuracy through any terrain type. Immune to electrical attacks which heal 1 point per 3 points of damage it would have done.",
    ],
    [
      "10",
      "Red Dragon",
      "10d8+9",
      "1d4",
      "H",
      "",
      "1480",
      "Red Dragon: AC 21, HD 10** (+9), #At 2 claws/1 bite or breath/1 tail, Dam 1d8/1d8/4d8 or breath/1d8, Mv 30' Fly 80' (20'), Sv F10 (as Hit Dice), Ml 8 Immune to normal fire. Suffer half damage from magical fire.",
    ],
    [
      "10",
      "Hydra",
      "10d8+9",
      "1",
      "B",
      "",
      "1300",
      "Hydra: AC 21, HD 10 (+9), #At 10 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F10, Ml 9 ",
    ],
    [
      "10",
      "Efreeti",
      "10d8+9",
      "1",
      "",
      "",
      "1390",
      "Efreeti*: AC 21 ‡, HD 10* (+9), #At 1, Dam 2d8 or special,, Mv 30' Fly 80' (10'), Sv F15, Ml 12 (9) ",
    ],
    [
      "10",
      "Black Pudding",
      "10d8",
      "1",
      "",
      "",
      "1390",
      "Black Pudding*: AC 14, HD 10* (+9), #At 1 pseudopod, Dam 3d8, Mv 20', Sv F10, Ml 12 ",
    ],
    [
      "10",
      "Ghost",
      "10d8",
      "1",
      "E, N, O",
      "",
      "5500",
      "Ghost: AC 20*, HD 10 (+9), #At 1 touch/1 gaze, Dam 1d6 + special, Mv 30', Sv F10, Ml 10 Cause fear; drains 1 point constitution in addition to damage with hit; telekinesis; possession (magic jar).",
    ],
    [
      "11",
      "Clay Golem",
      "11d8+9",
      "1",
      "",
      "",
      "1765",
      "Clay Golem*: AC 22 ‡, HD 11** (+9), #At 1 fist, Dam 3d10, Mv 20', Sv F6, Ml 12 1% chance per round cumulative of going berserk. Damage it inflicts can only be healed magically (1 point per die of healing.)",
    ],
    [
      "11",
      "Gold Dragon",
      "11d8+9",
      "1d4",
      "H",
      "",
      "1765",
      "Gold Dragon: AC 22, HD 11** (+9), #At 2 claws/1 bite or breath/1 tail, Dam 2d4/2d4/6d6 or breath/2d4, Mv 30' Fly 80' (20'), Sv F11 (as Hit Dice), Ml 10 Immune to all poisons and normal fire. Suffer half damage from magical fire.",
    ],
    [
      "11",
      "Hydra",
      "11d8+9",
      "1",
      "B",
      "",
      "1575",
      "Hydra: AC 22, HD 11 (+9), #At 11 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F11, Ml 9 ",
    ],
    [
      "11",
      "Purple Worm",
      "11d8",
      "1d2",
      "",
      "",
      "1670",
      "Purple Worm: AC 16, HD 11* (+9) to 20* (+13), #At 1 bite/1 sting, Dam 2d8/1d8+poison, Mv 20' (15'), Sv F6 to F10 (1/2 Hit Dice), Ml 10 ",
    ],
    [
      "12",
      "Hydra",
      "12d8+10",
      "1",
      "B",
      "",
      "1875",
      "Hydra: AC 23, HD 12 (+10), #At 12 bites, Dam 1d10 per bite, Mv 40' (10'), Sv F12, Ml 9 ",
    ],
    [
      "12",
      "Air Elemental",
      "12d8+10",
      "1",
      "",
      "",
      "1975",
      "Air Elemental*: AC 20 ‡, HD 12* (+10), #At 1 special, Dam 2d8, Mv Fly 120', Sv F12, Ml 10 Double damage from earth based attacks. +1d8 points of damage against airborne creatures or vehicles. May make 1 attack or a gust against all opponents in a 5' radius: creatures of 2 hit dice or less must save vs. Death Ray or fall prone. Creatures of 3 or more levels or hit dice are not affected.",
    ],
    [
      "12",
      "Earth Elemental",
      "12d8+10",
      "1",
      "",
      "",
      "1975",
      "Earth Elemental*: AC 20 ‡, HD 12* (+10), #At 1, Dam 2d8, Mv 20' (10'), Sv F12, Ml 10 Suffer double damage from fire attacks; do an +1d8 damage against creatures, vehicles, or structures which rest on the ground.",
    ],
    [
      "12",
      "Fire Elemental",
      "12d8+10",
      "1",
      "",
      "",
      "1975",
      "Fire Elemental*: AC 20 ‡, HD 12* (+10), #At 1, Dam 2d8, Mv 40' Fly 30', Sv F12, Ml 10 Take double damage from water attacks; +1d8 points of damage against creatures which are cold or icy in nature and set fire to flammables they contact.",
    ],
    [
      "12",
      "Water Elemental",
      "12d8+10",
      "1",
      "",
      "",
      "1975",
      "Water Elemental*: AC 20 ‡, HD 12* (+10), #At 1, Dam 2d8, Mv 20' (15') Swim 60', Sv F12, Ml 10 Take double damage when attacked from air/wind attacks. A water; +1d8 points of damage against creatures, vehicles, or structures which are in the water.",
    ],
    [
      "12",
      "Frost Salamander",
      "12d8+10",
      "1d3",
      "E",
      "",
      "1975",
      "Frost Salamander*: AC 21 ‡, HD 12* (+10), #At 4 claws/1 bite+cold, Dam 1d6/1d6/1d6/1d6/2d6+1d8/round, Mv 40', Sv F12, Ml 9 ",
    ],
    [
      "14",
      "Stone Golem",
      "14d8+11",
      "1",
      "",
      "",
      "2730",
      "Stone Golem*: AC 25 ‡, HD 14** (+11), #At 1 + special, Dam 3d8 + special, Mv 20' (10'), Sv F7, Ml 12 Can use slow once every other round for 10' range and 2d6 duration if affected. Stone to flesh spells make them vulnerable to normal weapons for 1 round after being affected if they fail a save vs. Spells.",
    ],
    [
      "16",
      "Air Elemental",
      "16d8+12",
      "1",
      "",
      "",
      "3385",
      "Air Elemental*: AC 22 ‡, HD 16* (+12), #At 1 special, Dam 3d6, Mv Fly 120', Sv F16, Ml 10 Double damage from earth based attacks. +1d8 points of damage against airborne creatures or vehicles. May make 1 attack or a gust against all opponents in a 5' radius: creatures of 2 hit dice or less must save vs. Death Ray or fall prone. Creatures of 3 or more levels or hit dice are not affected.",
    ],
    [
      "16",
      "Earth Elemental",
      "16d8+12",
      "1",
      "",
      "",
      "3385",
      "Earth Elemental*: AC 22 ‡, HD 16* (+12), #At 1, Dam 3d6, Mv 20' (10'), Sv F16, Ml 10 Suffer double damage from fire attacks; do an +1d8 damage against creatures, vehicles, or structures which rest on the ground.",
    ],
    [
      "16",
      "Fire Elemental",
      "16d8+12",
      "1",
      "",
      "",
      "3385",
      "Fire Elemental*: AC 22 ‡, HD 16* (+12), #At 1, Dam 3d6, Mv 40' Fly 30', Sv F16, Ml 10 Take double damage from water attacks; +1d8 points of damage against creatures which are cold or icy in nature and set fire to flammables they contact.",
    ],
    [
      "16",
      "Water Elemental",
      "16d8+12",
      "1",
      "",
      "",
      "3385",
      "Water Elemental*: AC 22 ‡, HD 16* (+12), #At 1, Dam 3d6, Mv 20' (15') Swim 60', Sv F16, Ml 10 Take double damage when attacked from air/wind attacks. A water; +1d8 points of damage against creatures, vehicles, or structures which are in the water.",
    ],
    [
      "16",
      "Purple Worm",
      "16d8",
      "1d2",
      "",
      "",
      "3250",
      "Purple Worm: AC 16, HD 11* (+9) to 20* (+13), #At 1 bite/1 sting, Dam 2d8/1d8+poison, Mv 20' (15'), Sv F6 to F10 (1/2 Hit Dice), Ml 10 ",
    ],
    [
      "17",
      "Iron Golem",
      "17d8+123",
      "1",
      "",
      "",
      "3890",
      "Iron Golem*: AC 25 ‡, HD 17** (+12), #At 1 + special, Dam 4d10 + special, Mv 20' (10'), Sv F9, Ml 12 Up to 3 times per day can emit poison gas 10' cube (save versus dragon breath or die.) Electricity slows 3 rounds and fire removes slow and heals 1 point per 3 points of damage it is rated for.",
    ],
    [
      "20",
      "Bronze Golem",
      "20d8+13",
      "1",
      "",
      "",
      "5650",
      "Bronze Golem*: AC 20 ‡, HD 20** (+13), #At 1 fist + special, Dam 3d10 + special, Mv 80' (10'), Sv F10, Ml 12 1% chance of going beserk each round cumulative. Attackers who are hit take +1d10 fire damage and those who hit it are splashed for 2d6 fire (save vs. death ray to avoid).",
    ],
    [
      "20",
      "Purple Worm",
      "20d8",
      "1d2",
      "",
      "",
      "5450",
      "Purple Worm: AC 16, HD 11* (+9) to 20* (+13), #At 1 bite/1 sting, Dam 2d8/1d8+poison, Mv 20' (15'), Sv F6 to F10 (1/2 Hit Dice), Ml 10 ",
    ],
  ];

  static humanoids = [
    [
      "Bugbear Warrior armored",
      "4d8+4",
      "R",
      "240",
      "Bugbear Warrior armored: AC 15, HD 4+4, #At 1 weapon, Dam 1d8+2 or by weapon +2, Mv 30', Sv F4, Ml 10 Surprise on 1-3 on 1d6 wearing leather or less",
    ],
    [
      "Gnoll Warrior armored",
      "4d8",
      "S",
      "240",
      "Gnoll Warrior armored: AC 15, HD 4, #At 1 weapon, Dam 2d4+1 or by weapon +2, Mv 30', Sv F4, Ml 9 ",
    ],
    [
      "Goblin Warrior armored",
      "3d8-1",
      "R",
      "145",
      "Goblin Warrior armored: AC 14, HD 3-3, #At 1 weapon, Dam 1d6 or by weapon, Mv 20', Sv F3, Ml 8 Raises morale of lesser goblins to 8",
    ],
    [
      "Hobgoblin Warrior armored",
      "3d8",
      "Q",
      "145",
      "Hobgoblin Warrior armored: AC 14, HD 3, #At 1 weapon, Dam 1d8 or by weapon, Mv 30', Sv F3, Ml 9 ",
    ],
    [
      "Kobold Warrior armored",
      "1d8",
      "Q",
      "10",
      "Kobold Warrior armored: AC 13, HD 1, #At 1 weapon, Dam 1d4 or by weapon, Mv 20', Sv F1, Ml 7 ",
    ],
    [
      "Ogre Pack Leader armored",
      "6d8",
      "",
      "500",
      "Ogre Pack Leader armored: AC 15, HD 6+1, #At 1 weapon, Dam 2d6 with ogre weapon (+3 with normal weapon), Mv 30', Sv F6, Ml 11 ",
    ],
    [
      "Orc Warrior armored",
      "2d8",
      "",
      "75",
      "Orc Warrior armored: AC 14, HD 2, #At 1 weapon, Dam 1d8 or by weapon, Mv 30', Sv F2, Ml 9 ",
    ],
  ];

  /**
   * Initializes a new monster instance.
   */
  constructor() {
    this.id = 0;
    this.room = null;
    this.name = "";
    this.statBlock = "";
    this.appearing = 1;
    this.hp = [];
    this.parent = null;
  }

  /**
   * Generates and registers a new monster instance in global tracking lists.
   * @param {number|null} roomId - Room identifier if placed in a room.
   * @param {Array} roomList - List of rooms.
   * @returns {Monster} The created monster instance.
   */
  static generate(roomId = null, roomList) {
    // Create new monster instance and assign next available ID
    const m = new Monster();
    m.id = window.cocMonsterList ? window.cocMonsterList.length : 0;
    if (!window.cocMonsterList) window.cocMonsterList = [];
    window.cocMonsterList[m.id] = m;

    // Associate monster with room if roomId is provided
    if (roomId !== null && roomList[roomId]) {
      m.room = roomId;
      roomList[roomId].monsters.push(m.id);
    }
    return m;
  }

  /**
   * Creates a monster scaled to the given dungeon level.
   * @param {number|null} roomId - Room identifier.
   * @param {number} level - Dungeon level.
   * @param {Array} roomList - List of rooms.
   * @param {Cavern} cavern - Cavern generator instance.
   * @returns {Monster} The generated monster.
   */
  static makeMonsterByLevel(roomId = null, level = 1, roomList, cavern) {
    const maxHD = level + Math.floor(Math.sqrt(level));
    let m = null;

    // If placing in a room, attempt to reuse an existing monster type from current level or above 25% of the time
    if (roomId !== null) {
      const useExistingType =
        cavern && typeof cavern.p === "function"
          ? Dice.p(25)
          : Math.random() < 0.25;
      if (useExistingType) {
        const candidateNames = [];
        // Collect monster names from other rooms on this level
        if (roomList) {
          roomList.forEach((r) => {
            if (r.id === roomId) return;
            if (r.monsters && r.monsters.length > 0) {
              r.monsters.forEach((mId) => {
                const monsterObj = window.cocMonsterList
                  ? window.cocMonsterList[mId]
                  : null;
                if (monsterObj && monsterObj.name) {
                  candidateNames.push(monsterObj.name);
                }
              });
            }
          });
        }

        // Collect monster names from rooms on levels above
        if (
          window.cocGeneratedLevels &&
          Array.isArray(window.cocGeneratedLevels)
        ) {
          window.cocGeneratedLevels.forEach((lvl) => {
            if (lvl.level < level) {
              if (lvl.roomList) {
                lvl.roomList.forEach((r) => {
                  if (r.monsters && r.monsters.length > 0) {
                    r.monsters.forEach((mId) => {
                      const monsterObj = lvl.monsterList
                        ? lvl.monsterList[mId]
                        : null;
                      if (monsterObj && monsterObj.name) {
                        candidateNames.push(monsterObj.name);
                      }
                    });
                  }
                });
              }
            }
          });
        }

        // Filter candidates to those valid for current max HD
        const validCandidates = [];
        candidateNames.forEach((name) => {
          const rosterEntry = Monster.roster.find((entry) => entry[1] === name);
          if (rosterEntry && parseInt(rosterEntry[0], 10) <= maxHD) {
            if (!validCandidates.includes(rosterEntry)) {
              validCandidates.push(rosterEntry);
            }
          }
        });

        // Choose a valid candidate monster type if available
        if (validCandidates.length > 0) {
          m = Dice.chooseOne(validCandidates);
        }
      }
    }

    // Fall back to picking a random monster from roster within max HD limit
    if (!m) {
      do {
        m = Dice.chooseOne(Monster.roster);
      } while (parseInt(m[0], 10) > maxHD);
    }

    // Initialize monster attributes from roster entry
    const monster = Monster.generate(roomId, roomList);
    monster.name = m[1];
    monster.statBlock = m[7];
    monster.appearing = Dice.computeRoll(m[3]);
    if (monster.appearing <= 0) monster.appearing = 1;

    // Scale number appearing if level exceeds monster HD requirement
    const levelDiff = maxHD - parseInt(m[0], 10);
    if (levelDiff > 0) {
      monster.appearing *= Math.floor(Math.sqrt(levelDiff));
    }

    // Helper function to spawn humanoid leader bodyguards/warriors
    const checkHumanoid = (name, threshold, warriorName) => {
      if (monster.name === name && monster.appearing >= threshold) {
        const warriors = Math.round(monster.appearing / threshold);
        monster.appearing -= warriors;
        const children = Monster.makeWarriors(
          roomId,
          warriorName,
          warriors,
          roomList,
          cavern,
        );
        children.parent = monster.id;
      }
    };

    // Check and spawn humanoid warrior squads
    checkHumanoid("Bugbear", 8, "Bugbear Warrior armored");
    checkHumanoid("Gnoll", 6, "Gnoll Warrior armored");
    checkHumanoid("Goblin", 8, "Goblin Warrior armored");
    checkHumanoid("Hobgoblin", 6, "Hobgoblin Warrior armored");
    checkHumanoid("Kobold", 6, "Kobold Warrior armored");
    checkHumanoid("Ogre", 6, "Ogre Pack Leader armored");
    checkHumanoid("Orc", 8, "Orc Warrior armored");

    // Roll hit points for each individual monster in the group and generate lair treasure
    for (let i = 0; i < monster.appearing; i++) {
      monster.hp.push(Dice.computeRoll(m[2]));
      if (roomId !== null) {
        m[5].split(",").forEach((t) => {
          t = t.trim();
          if (t) Item.makeTreasureByLetter(roomId, t, roomList, cavern);
        });
      }
    }
    if (roomId !== null) {
      m[4].split(",").forEach((t) => {
        t = t.trim();
        if (t) Item.makeTreasureByLetter(roomId, t, roomList, cavern);
      });
    }
    return monster;
  }

  /**
   * Generates a subgroup of armored humanoid warriors.
   * @param {number|null} roomId - Room identifier.
   * @param {string} name - Warrior type name.
   * @param {number} appearing - Number appearing.
   * @param {Array} roomList - Room list.
   * @param {Cavern} cavern - Cavern generator.
   * @returns {Monster} The generated warrior monster group.
   */
  static makeWarriors(roomId, name, appearing, roomList, cavern) {
    // Find matching humanoid warrior profile
    let warrior = null;
    for (const h of Monster.humanoids) {
      if (h[0] === name) {
        warrior = h;
        break;
      }
    }
    // Generate monster group for warriors
    const monster = Monster.generate(roomId, roomList);
    monster.name = warrior[0];
    monster.statBlock = warrior[4];
    monster.appearing = appearing;

    // Roll hit points and treasure for warriors
    for (let i = 0; i < monster.appearing; i++) {
      monster.hp.push(Dice.computeRoll(warrior[1]));
      if (roomId !== null) {
        warrior[2].split(",").forEach((t) => {
          t = t.trim();
          if (t) Item.makeTreasureByLetter(roomId, t, roomList, cavern);
        });
      }
    }
    return monster;
  }
}
