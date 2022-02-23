
export interface FType {
  type: "Human" | "Orc" | "Goblin";
  sizeIncrease: number;
  weightIncrease: number;
  multiplesRate: number;
  strength: string;
  movement: string;
  menuText: {
    single: string;
    multiple: string;
  };
}


export const fType: {
  [key: string]: FType;
} = {
  human: {
    type: "Human",
    sizeIncrease: 95,
    weightIncrease: 95,
    // could have up to triplets
    multiplesRate: 0.9,
    strength: "normal",
    movement: "normal",
    menuText: { single: "a human child", multiple: "human children" }
  },
  goblin: {
    type: "Goblin",
    sizeIncrease: 60,
    weightIncrease: 50,
    // normal is triplets, can go up to quintuplets
    multiplesRate: 1,
    strength: "normal",
    movement: "normal",
    menuText: { single: "a goblin child", multiple: "goblin children" }
  },
  orc: {
    type: "Orc",
    sizeIncrease: 130,
    weightIncrease: 200,
    // will never have more than twins
    multiplesRate: 0.7,
    strength: "high",
    movement: "high",
    menuText: { single: "an orc child", multiple: "orcish children" }
  }
};