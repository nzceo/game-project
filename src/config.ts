import RPG from "create-rpg";
import townMaps from "./gameData/maps/town";
import levels from "./gameData/levels";
import stats from "./gameData/stats";
import archetypes from "./gameData/archetypes";
import weapons from "./gameData/weapons";
import armors from "./gameData/armors";
import player from "./gameData/player";
import fertile from "./gameData/statuses/fertile";
import Status from "./gameData/statuses";
import render from './gameData/render'

const { Character, Quest, Actor, Map } = RPG;

export const config = {
  maps: [...townMaps],
  defaultMap: townMaps[0],
  defaultWeapon: weapons.unarmed,
  defaultArmor: armors.clothes,
  render,
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
    combat: stats.weak,
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
    fertile,
  },
  quests: {},

  classes: {
    player,
    actor: Actor,
    character: Character,
    map: Map,
    quest: Quest,
    status: Status,
  },
};
