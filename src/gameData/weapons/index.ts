import { IWeapon } from "ts-rpg-framework/dist/core/types";


const weapons: {
  [name: string]: IWeapon;
} = {
  unarmed: {
    name: "bare fists",
    damage: 1,
    governingSkill: "unarmed"
  },
  sword: {
    name: "simple sword",
    damage: 2,
    governingSkill: "oneHanded"
  }
};

export default weapons;