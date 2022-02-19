import RPG from "create-rpg";
import townMaps from "./gameData/maps/town";
import levels from "./gameData/levels";
import stats from "./gameData/stats";
import archetypes from "./gameData/archetypes";
import weapons from "./gameData/weapons";
import armors from "./gameData/armors";

import pregnancy from "./gameData/statuses/pregnancy";
import Status from "./gameData/statuses";

const { Player, Actor, Character, Map, Quest } = RPG;

export const config = {
  maps: [...townMaps],
  defaultMap: townMaps[0],
  defaultWeapon: weapons.unarmed,
  defaultArmor: armors.clothes,
  player: {
    name: "Hero",
    dialogRef: "",
    mapRef: townMaps[0].id,
    checkpointRef: townMaps[0].id,
    experience: {
      ...levels[0],
      current: 0,
    },
    levelData: levels,
    combat: stats.strong,
    description: archetypes.player,
  },
  governingStats: {
    unarmed: "strength",
    oneHanded: "dexterity",
    ranged: "dexterity",
    twoHanded: "strength",
    poles: "dexterity",
    occult: "intelligence",
    lockPick: "perception",
    speech: "charisma",
    barter: "charisma",
    tinkering: "intelligence",
  },
  statuses: {
    pregnancy,
  },
  quests: {},

  classes: {
    player: Player,
    actor: Actor,
    character: Character,
    map: Map,
    quest: Quest,
    status: Status,
  },
};
